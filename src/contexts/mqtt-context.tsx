import {createContext, FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef} from 'react'
import MQTT from 'mqtt'
import {MqttClient} from 'mqtt'

import PropTypes from 'prop-types'
import {MqttState} from '~/src/types/mqtt'
import logger from '~/src/thunks/logger'
import {useDispatch, useSelector} from '~/src/store'
import {mqttConfig} from '~/src/config'

export interface MqttContextType extends MqttState {
}

export const MqttContext = createContext<MqttContextType>({
  isInitialized: false,
  client: null,
})

interface MqttProviderProps {
  children: ReactNode
}

export const MqttProvider: FC<MqttProviderProps> = (props) => {
  const clientRef = useRef<MqttClient | null>(null)
  const { children } = props
  const dispatch = useDispatch()

  useEffect(() => {
    if (clientRef.current) return

    const accessToken = window.localStorage.getItem("ACCESS_TOKEN") || ""
    const client = MQTT.connect(
      mqttConfig.brokerUrl,
      {
        username: accessToken,
        password: "jwt",
        protocolVersion: 5,
        rejectUnauthorized: true,
      },
    )
    client.on("connect", () => {
      dispatch(logger.push("debug", "mqtt connected"))
    })
    client.on("error", (e) => {
      console.log("Error", e)
    })
    clientRef.current = client
  },[clientRef])

  return (
    <MqttContext.Provider
      value={{
        isInitialized: true,
        client: clientRef.current,
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
