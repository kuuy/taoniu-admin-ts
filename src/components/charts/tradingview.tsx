import styles from './tradingview.module.css'
import React, {useEffect, useRef} from 'react'
import {
  ChartingLibraryWidgetOptions,
  CreateShapeOptions,
  LanguageCode,
  PricedPoint,
  ResolutionString,
  widget,
} from "~/public/assets/charting_library"
import {SaveLoadAdapter} from '~/src/components/charts/tradginview-adapter'
import {IndicatorsResult} from '~/src/types/indicator'

export interface TradingViewProps extends ChartingLibraryWidgetOptions {
  onIndicatorsLoading?: (symbol: string, interval: string, fields: string[]) => IndicatorsResult
  onSymbolChanged?: (symbol: string) => void
}

export const TradingView = (props: Partial<TradingViewProps>) => {
  const { onIndicatorsLoading, onSymbolChanged } = props
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const saveLoadAdapter = new SaveLoadAdapter()

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      theme: props.theme,
      symbol: props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        props.datafeed_url,
        {
          maxResponseLength: 1000,
          expectedOrder: "latestFirst",
        }
      ),
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      // client_id: props.client_id,
      // user_id: props.user_id,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      load_last_chart: true,
      auto_save_delay: 3,
      save_load_adapter: saveLoadAdapter,
    }

    const tvWidget = new widget(widgetOptions)

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton()
        button.setAttribute("title", "Click to show a notification popup")
        button.classList.add("apply-common-tooltip")
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!")
            },
          })
        )

        button.innerHTML = "Check API"
      })

      const chart = tvWidget.activeChart()
      chart.onSymbolChanged().subscribe(null, () => {
        // chart.getAllShapes().forEach((shape) => {
        //   if (shape.name === "horizontal_line") {
        //     const properties = chart.getShapeById(shape.id).getProperties()
        //     const text = properties["text"] || ""
        //     console.log("shape", text, properties)
        //     // chart.removeEntity(shape.id)
        //   }
        // })
        onSymbolChanged?.(chart.symbol())
        console.log('The symbol is changed', chart.symbol())
        console.log("symbol changed")
      })

      chart.onDataLoaded().subscribe(null, () => {
        const symbol = chart.symbol()
        const resolution = chart.resolution()
        let interval = "1d"
        if (resolution == "1") {
          interval = "1m"
        } else if (resolution == "15") {
          interval = "15m"
        } else if (resolution == "240") {
          interval = "4h"
        }

        const fields = [
          "r3",
          "r2",
          "r1",
          "s1",
          "s2",
          "s3",
          "poc",
          "vah",
          "val",
          "profit_target",
          "take_profit_price",
          "stop_loss_point",
        ]

        onIndicatorsLoading?.(
          symbol,
          interval,
          fields,
        ).then((indicators) => {
          chart.getAllShapes().forEach((shape) => {
            if (shape.name === "horizontal_line") {
              const line = chart.getShapeById(shape.id)
              const properties = line.getProperties()
              const text = properties["text"] || ""
              const field = text.replace(`${interval}:`, "")
              if (indicators[field]) {
                console.log("text match", properties)
                line.setPoints(line.getPoints().map((point) => {
                  point.price = indicators[field]
                  return point
                }))
                indicators[field] = 0
                // chart.removeEntity(shape.id)
              }
            }
          })

          for (let i = 0; i < fields.length; i++) {
            if (indicators[fields[i]] <= 0) {
              continue
            }
            const text = `${interval}:${fields[i]}`
            const point = {
              price: indicators[fields[i]],
              time: 0,
            }
            let linecolor = "rgba(21, 119, 96, 1)"
            let textColor = "rgba(21, 119, 96, 1)"
            let linewidth = 2.0
            let linestyle = 2
            let horzLabelsAlign = "right"
            let vertLabelsAlign = "bottom"
            if (fields[i] === "r1" || fields[i] === "r2" || fields[i] === "r3") {
              linecolor = "rgba(206, 147, 216, 1)"
              textColor = "rgba(248, 187, 208, 1)"
            }
            if (fields[i] === "s1" || fields[i] === "s2" || fields[i] === "s3") {
              linecolor = "rgba(255, 183, 77, 1)"
              textColor = "rgba(255, 245, 157, 1)"
              vertLabelsAlign = "top"
            }
            if (fields[i] === "r3" || fields[i] === "s3") {
              linewidth = 3.0
              linestyle = 3
            }
            if (fields[i] == "poc") {
              linecolor = "rgba(8, 153, 129, 1)"
              textColor = "rgba(8, 153, 129, 1)"
              linewidth = 3.0
              linestyle = 3
              horzLabelsAlign = "center"
            }
            if (fields[i] == "vah") {
              linecolor = "rgba(242, 54, 69, 1)"
              textColor = "rgba(242, 54, 69, 1)"
            }
            if (fields[i] == "val") {
              linecolor = "rgba(41, 98, 255, 1)"
              textColor = "rgba(41, 98, 255, 1)"
              vertLabelsAlign = "top"
            }
            if (fields[i] == "take_profit_price") {
              linecolor = "rgba(76, 175, 80, 1)"
              textColor = "rgba(76, 175, 80, 1)"
              linewidth = 3.0
              linestyle = 3
              horzLabelsAlign = "center"
            }
            if (fields[i] == "profit_target") {
              linecolor = "rgba(248, 187, 208, 1)"
              textColor = "rgba(248, 187, 208, 1)"
              linewidth = 3.0
              linestyle = 0
            }
            if (fields[i] == "stop_loss_point") {
              linecolor = "rgba(255, 245, 157, 1)"
              textColor = "rgba(255, 245, 157, 1)"
              linewidth = 3.0
              linestyle = 0
            }
            const options = {
              text: text,
              shape: "horizontal_line" as any,
              overrides: {
                linecolor: linecolor,
                linewidth: linewidth,
                linestyle: linestyle,
                showLabel: true,
                textcolor: textColor,
                horzLabelsAlign: horzLabelsAlign,
                vertLabelsAlign: vertLabelsAlign,
              },
            }
            chart.createShape(point, options)
          }
        })

        // const fields = [
        //   "r3",
        //   "r2",
        //   "r1",
        //   "s1",
        //   "s2",
        //   "s3",
        //   "poc",
        //   "vah",
        //   "val",
        //   "profit_target",
        //   "take_profit_price",
        //   "stop_loss_point",
        // ]
        // indicatorsApi.gets({
        //   symbols: symbol,
        //   interval: interval,
        //   fields: fields.join(','),
        // }).then((response) => {
        //   if (!response.success) {
        //     throw new Error(response.error!)
        //   }
        //
        //   const data = response.data![0].split(",").map((value) => {
        //     return Number(value)
        //   })
        //
        //   const indicators: Record<string, number> = {}
        //   for (let i = 0; i < fields.length; i++) {
        //     indicators[fields[i]] = data[i]
        //   }
        //
        //   chart.getAllShapes().forEach((shape) => {
        //     if (shape.name === "horizontal_line") {
        //       const line = chart.getShapeById(shape.id)
        //       const properties = line.getProperties()
        //       const text = properties["text"] || ""
        //       const field = text.replace(`${interval}:`, "")
        //       if (indicators[field]) {
        //         console.log("text match", properties)
        //         line.setPoints(line.getPoints().map((point) => {
        //           point.price = indicators[field]
        //           return point
        //         }))
        //         indicators[field] = 0
        //         // chart.removeEntity(shape.id)
        //       }
        //     }
        //   })
        //
        //   for (let i = 0; i < fields.length; i++) {
        //     if (indicators[fields[i]] <= 0) {
        //       continue
        //     }
        //     const text = `${interval}:${fields[i]}`
        //     const point = {
        //       price: indicators[fields[i]],
        //       time: 0,
        //     }
        //     let linecolor = "rgba(21, 119, 96, 1)"
        //     let textColor = "rgba(21, 119, 96, 1)"
        //     let linewidth = 2.0
        //     let linestyle = 2
        //     let horzLabelsAlign = "right"
        //     let vertLabelsAlign = "bottom"
        //     if (fields[i] === "r1" || fields[i] === "r2" || fields[i] === "r3") {
        //       linecolor = "rgba(206, 147, 216, 1)"
        //       textColor = "rgba(248, 187, 208, 1)"
        //     }
        //     if (fields[i] === "s1" || fields[i] === "s2" || fields[i] === "s3") {
        //       linecolor = "rgba(255, 183, 77, 1)"
        //       textColor = "rgba(255, 245, 157, 1)"
        //       vertLabelsAlign = "top"
        //     }
        //     if (fields[i] === "r3" || fields[i] === "s3") {
        //       linewidth = 3.0
        //       linestyle = 3
        //     }
        //     if (fields[i] == "poc") {
        //       linecolor = "rgba(8, 153, 129, 1)"
        //       textColor = "rgba(8, 153, 129, 1)"
        //       linewidth = 3.0
        //       linestyle = 3
        //       horzLabelsAlign = "center"
        //     }
        //     if (fields[i] == "vah") {
        //       linecolor = "rgba(242, 54, 69, 1)"
        //       textColor = "rgba(242, 54, 69, 1)"
        //     }
        //     if (fields[i] == "val") {
        //       linecolor = "rgba(41, 98, 255, 1)"
        //       textColor = "rgba(41, 98, 255, 1)"
        //       vertLabelsAlign = "top"
        //     }
        //     if (fields[i] == "take_profit_price") {
        //       linecolor = "rgba(76, 175, 80, 1)"
        //       textColor = "rgba(76, 175, 80, 1)"
        //       linewidth = 3.0
        //       linestyle = 3
        //       horzLabelsAlign = "center"
        //     }
        //     if (fields[i] == "profit_target") {
        //       linecolor = "rgba(248, 187, 208, 1)"
        //       textColor = "rgba(248, 187, 208, 1)"
        //       linewidth = 3.0
        //       linestyle = 0
        //     }
        //     if (fields[i] == "stop_loss_point") {
        //       linecolor = "rgba(255, 245, 157, 1)"
        //       textColor = "rgba(255, 245, 157, 1)"
        //       linewidth = 3.0
        //       linestyle = 0
        //     }
        //     const options = {
        //       text: text,
        //       shape: "horizontal_line" as any,
        //       overrides: {
        //         linecolor: linecolor,
        //         linewidth: linewidth,
        //         linestyle: linestyle,
        //         showLabel: true,
        //         textcolor: textColor,
        //         horzLabelsAlign: horzLabelsAlign,
        //         vertLabelsAlign: vertLabelsAlign,
        //       },
        //     }
        //     chart.createShape(point, options)
        //   }
        // })
      })

      // tvWidget.getSavedCharts((chartRecords) => {
      //   console.log("saved", chartRecords)
      // })

      // const chartRecord = {
      //   id: "";
      //   name: "";
      //   image_url: "";
      //   modified_iso: "";
      //   short_symbol: "";
      //   interval: ""
      // }
      // tvWidget.loadChartFromServer(chartRecord)

      tvWidget.getSavedCharts((chartRecords) => {
        chartRecords.forEach((chartRecord) => {
          tvWidget.loadChartFromServer(chartRecord)
        })
      })

      tvWidget.subscribe('onAutoSaveNeeded', function() {
        tvWidget.saveChartToServer(() => {},() => {}, {
          chartName: chart.symbol(),
        })
      })

      // tvWidget.subscribe("onAutoSaveNeeded", () => {
      //   // tvWidget.save((settings: any) => {
      //   //   console.log("save", settings)
      //   // })
      //   tvWidget.saveChartToServer(null, null, {
      //     chartName: "BTCUSDT",
      //   })
      //   console.log("onAutoSaveNeeded")
      // })

      // "rgba(149, 152, 161, 1)"
      // chart.getAllShapes().forEach((shape) => {
      //   console.log("shape", shape)
      // })
      // tvWidget.activeChart().createShape(
      //   {
      //     price: 29850.0,
      //   },
      //   {
      //     text: "poc",
      //     shape: "horizontal_line",
      //     overrides: {
      //       linecolor: "rgba(21, 119, 96, 1)",
      //       linewidth: 2.0,
      //       linestyle: 0,
      //       showLabel: true,
      //       textcolor: "rgba( 21, 119, 96, 1)",
      //       horzLabelsAlign: "right",
      //     },
      //   },
      // )
    })

    return () => {
      tvWidget.remove()
    }
  }, [props])

  return (
    <>
      <div ref={chartContainerRef} className={styles.container} />
    </>
  )
}
