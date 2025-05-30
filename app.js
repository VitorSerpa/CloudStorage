const express = require("express")
const app = express()

const mediaRoutes = require("./src/routes/mediaRoutes")

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use("/api/media", mediaRoutes)

app.use("/uploads" , express.static("uploads"))

app.listen(3000, () => {
    console.log("Aplicação rodando em localhost:3000!")
})