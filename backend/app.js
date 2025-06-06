const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const mediaRoutes = require("./src/routes/mediaRoutes")

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use("/media", mediaRoutes)

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
    res.send("<h1>Olá!</h1>")
})

app.listen(5000, () => {
    console.log("Aplicação rodando em localhost:5000!")
})