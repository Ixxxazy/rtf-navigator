const {Schema, model} = require('mongoose')

const element = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    coordinates: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    incidentNodes: {
        type: Array,
    },
    name: {
        type: String,
    },
    longName: {
        type: String,
    },
    description: {
        type: String,
    },
    workingHours: {
        type: String,
    },
    staircaseGroup: {
        type: Number,
    }
})

const floor = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    elements: {
        type: [element],
        required: true
    },
})

const building = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    floors: {
        type: [floor],
        required: true
    }
})

module.exports = model('Building', building)