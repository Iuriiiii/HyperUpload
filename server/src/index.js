import express  from "express";

let app = express()

app.get(`/`, (req, res) => {
    res.send('here')
    console.log('hey')
})
app.listen(64000, () => {
    console.log('escuhando')
})
