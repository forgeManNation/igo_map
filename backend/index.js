const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000
const mongoose = require('mongoose')

//later add to .env
const MONGODB_URI="mongodb+srv://hordol122:Panklistak122@cluster0.ga03v.mongodb.net/?retryWrites=true&w=majority" 

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(bodyParser.json())

mongoose.connect(
    MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);



const initialState = {
    tableHeadData: [
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber:  0.5,
        },
        {
            name: "second hypothesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },
        {
            name: "first hypotesis",
            information: "",
            probabilityNumber: 0,
        },

    ],

    //
    tableBodyData: [
        {
            name: "evidence1",
            type: "collection ",
            credibility: "high",
            relevance: "low",
            inputCells: [
                "C",
                undefined,
                "N",
                "C",
                "I",
                "I",
                "I"
            ]
        },
        {
                name: "evidence2",
                inputCells: [
                    "C",
                    undefined,
                    "N",
                    "C",
                    "I",
                    "I",
                    "I"
                ]
            },
    ]
}



const userSchema = new mongoose.Schema({
        User: String,
        Profile_picture: String,
        Analysis: [
        
        {
        Name: String,
        Description: String,
        table_head_data: [
            {
                name: String,
                informaiton: String,
                probabilityNumber: Number
            }
        ],
        table_body_data: [
            {
                name: String,
                type: String,
                credibility: String,
                relevance: String,
                inputCells: [String]
            }
        ],
        }

    
    ],
        
});

const User = mongoose.model('User', userSchema);

const createdUser = new User({
    roll_no: 1001,
    name: 'Madison Hyde',
    year: 3,
    subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
});

createdUser.save().then(() => console.log('User saved', createdUser));

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/', (req, res) => {
    createdUser.save().then(() => console.log('User saved', createdUser));
})

app.listen(apiPort, () => console.log(`Server is runnig on port ${apiPort}`))

