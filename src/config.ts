export const mqttConfig = {
  brokerUrl: process.env.NEXT_PUBLIC_MQTT_BROKER_URL || '',
}

export const jweConfig = {
  publicKey: process.env.NEXT_PUBLIC_JWE_RSA_PUBLIC || '',
  privateKey: process.env.NEXT_PUBLIC_JWE_RSA_PRIVATE || '',
}

export const appConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
}

export const mapboxConfig = {
  apiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
}
