const strings = require('@supercharge/strings/dist')
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    filename: {type: String, required: true},
    path: {type: String, required: true},
    size: { type: Number, required: true},
    sender: {type: String, required: false},
    receiver : {type: String, required: false},
}, {timestamps: true})

module.exports = mongoose.model('File', fileSchema)