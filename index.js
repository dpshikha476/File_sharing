const express = require("express")
const path = require('path')
const cors = require('cors')



const app = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/db')
connectDB()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

// setup template engine
app.set('views', path.join(__dirname, 'views' ))
app.set('view engine', 'ejs')

// setup routes
app.use('/api/files', require('./routes/files'))
app.use('/files', require('./routes/info'))
app.use('/files/download', require('./routes/download'))

app.get('/', (req, res) => {
    return res.render('index')
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))