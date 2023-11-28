import Typography from '@mui/material/Typography'
import {io, ManagerOptions} from 'socket.io-client'
import {useEffect} from 'react'
import {SocketOptions} from 'engine.io-client'

export default function About() {
  // const socketInitializer = async () => {
  //   const socket = io({
  //     path: "/socket.io/cryptos",
  //     auth: {
  //       access_token: window.localStorage.getItem("ACCESS_TOKEN") || "",
  //     },
  //     transports: ["websocket"],
  //   })
  //   socket.on('connect', () => {
  //     console.log('connected')
  //   })
  //   socket.on("disconnect", (reason) => {
  //     console.log("reason", reason)
  //     socket.auth = {
  //       access_token: window.localStorage.getItem("ACCESS_TOKEN") || "",
  //     }
  //   })
  // }
  // useEffect(() => {
  //   socketInitializer()
  // }, [])

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Material UI - Next.js example in TypeScript
    </Typography>
  )
}
