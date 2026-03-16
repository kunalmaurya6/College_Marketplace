import express from 'express'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log("Server running on: ", PORT);
})