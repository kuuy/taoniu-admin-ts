import {MqttClient} from 'mqtt'

export interface MqttState {
  isInitialized: boolean
  client: MqttClient | null
}
