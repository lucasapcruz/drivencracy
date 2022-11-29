import express, { json } from "express"
import router from "./routes/router.js"

const app = express()
app.use(json())
app.use(router)

const serverPort = process.env.SERVER_PORT || 5000;

app.listen(serverPort, () => console.log(`Server is running in port: ${serverPort}`));