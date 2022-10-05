const express = require('express')
const router = express.Router()
const Subscriber = require("../model/user")

//Getting all subs
router.get("/",  async (req, res) => {
    try{
        const subscribers  =  await Subscriber.find()
        res.json(subscribers)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get("/:id", getSubscriber, (req, res) => {
    res.send(res.subscriber)
})

//Creating One
router.post("/", async (req, res) => {
    console.log(req.body.username, 'REQ');
     const subscriber = new Subscriber({
        username: req.body.username,
        profilePictureUrl: req.body.profilePictureUrl,
        analysis: req.body.analysis,
        created: Date.now()
})

try {
    const newSubscriber =  await subscriber.save();
    res.status(201).json(newSubscriber)
} catch (error) {
    res.status(400).json({message: error.message})
}
})

//Updating one
router.patch("/:id", getSubscriber, (req, res) => {
})

//Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getSubscriber (req, res, next){
    let subscriber = "";
    try {
        subscriber = await Subscriber.findById(req.params.id)

        if(subscriber == null){
            return res.status(404).json({
                message: 'Cannot find subscriber'
            })
        }

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.subscriber = subscriber
    next()
}


module.exports = router;