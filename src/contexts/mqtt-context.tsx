import {createContext, FC, ReactNode, useCallback, useEffect, useRef} from 'react'
import MQTT from 'mqtt'
import {MqttClient} from 'mqtt'

import PropTypes from 'prop-types'
import {MqttState} from '~/src/types/mqtt'
import thunks from '~/src/thunks/mqtt'
import logger from '~/src/thunks/logger'
import {useDispatch, useSelector} from '~/src/store'
import {mqttConfig} from '~/src/config'

export interface MqttContextType extends MqttState {
}

export const MqttContext = createContext<MqttContextType>({
  isConnected: false,
  isInitialized: false,
  topics: [],
})

interface MqttProviderProps {
  children: ReactNode
}

export const MqttProvider: FC<MqttProviderProps> = (props) => {
  const { children } = props
  const client = useRef<MqttClient | null>(null)
  const mqtt = useSelector((state) => state.mqtt)
  const dispatch = useDispatch()

  const initialize = useCallback(
    async (): Promise<void> => {
      dispatch(thunks.initial())
    },
    [dispatch, mqtt]
  )

  useEffect(() => {
    if (!mqtt.isInitialized) {
      initialize()
    } else {
      if (client.current) return
      const accessToken = window.localStorage.getItem("ACCESS_TOKEN") || ""
      try {
        console.log("access_token", window.localStorage.getItem("ACCESS_TOKEN"))
        client.current = MQTT.connect(
          mqttConfig.brokerUrl,
          {
            username: accessToken,
            password: "jwt",
            protocolVersion: 5,
            rejectUnauthorized: true,
          },
        )
      } catch (err) {
        console.error(err);
      }
      client.current?.on("connect", () => {
        console.log("connected to MQTT broker")
      })
      client.current?.on("error", (e) => {
        console.log("Error", e)
      })
      client.current?.on("disconnect", () => {
        console.log("Disconnected")
      })
      dispatch(logger.push("debug", "mqtt connect", mqttConfig.brokerUrl, accessToken))
    }
  },[mqtt])

  return (
    <MqttContext.Provider
      value={{
        ...mqtt,
      }}
    >
      {children}
    </MqttContext.Provider>
  )
}

MqttProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const MqttConsumer = MqttContext.Consumer
