import express from 'express'

const app = express()
const port = 12345

app.get('/', (req, res) => {
    res.send('Hellow WORLD!')
})

app.listen(port, () => {
    console.log(`connection Sccess, Port = ${port}`)
})
