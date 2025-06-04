const express = require("express")
const path = require("path")
const app = express()
const mediaRoutes = require("./src/routes/mediaRoutes")

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use("/media", mediaRoutes)

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
    res.send("<h1>Olá!</h1>")
})

app.listen(3000, () => {
    console.log("Aplicação rodando em localhost:3000!")
})