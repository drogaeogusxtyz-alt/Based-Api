const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/memory", require("./routes/memory"))

const PORT = 5001

app.listen(PORT, () => {
    console.log("Api online " + PORT)
})