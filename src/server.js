const express = require("express")
const app = express()
const fs = require("fs").promises

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = 8080

/*app.get('/saludo', (req, res) => {
        res.send("Server en Express")
})*/

app.get('/bienvenida', (req, res) => {
    const respuesta = `<p style="color:blue">Bienvenido al servidor</p>`
    res.send(respuesta)
})

app.get('/usuario/:id', (req, res) => {
    const user = {
        id: "1",
        name: "Nombre",
        email: "nombre@gmail.com"
    }
    res.json(user)
})



app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})