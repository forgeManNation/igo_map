const mongoose = require('mongoose')

const tableHeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true
    }
})

const tableBodySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        credibility: {
            type: String,
            required: true
        },
        relevance: {
            type: String,
            required: true
        },
        inputCells: {
            type: [String],
            required: true
        }
    
})


const analysisSchema = new mongoose.Schema({
    tableHeadData: [tableHeadSchema],
    tableBodyData: [tableBodySchema]
})




const subscriberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilePictureUrl: {
        type: String,
        required: true
    },
    // analysis: {
    //     type: [analysisSchema],
    //     required: true
    // },
    created: {
        type: Date,
        required: false
}
})

module.exports = mongoose.model('Subscriber', subscriberSchema, "")