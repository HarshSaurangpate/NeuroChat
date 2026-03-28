import express from "express";
import Thread from "../models/Thread.js";
import getGroqAPIResponse from "../utils/groq.js";

const router = express.Router();

//test 
router.post("/test", async(req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "Testing New Thread2"
        });

        const response = await thread.save();
        res.send(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
    }
});

//Get all threads 
router.get("/thread", async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updateAt: -1});
        //descending order of updatedAt...most recent data on top
        res.json(threads);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

//Get particular Threat
router.get("/thread/:threadId", async(req, res) => {
    try {
        const {threadId} = req.params;
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            return res.status(404).json({error: "Thread not found"});
        }
        res.json(thread.messages);
    } catch (err) {
        console.log("Thread Fetch Error:", err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

//Delete Particular Threat
router.delete("/thread/:threadId", async(req, res) => {
    
    try {
        const {threadId} = req.params;
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread) {
            return res.status(404).json({error: "Thread not found"});
        }
        res.json({ message: "Thread deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete threads"});
    }
});

//Post to Update a thread
router.post("/chat", async(req, res) => {
    
    const {threadId, message} = req.body;
    console.log("BODY:", req.body);

    if(!threadId || !message) {
       return res.status(400).json({error: "missing required fields" });
    }
    
    try {
        console.log("Finding thread...");
        let thread = await Thread.findOne({threadId});

        if(!thread){
            //create a new thread in DB
            console.log("Creating new thread...");
            thread = new Thread({
                threadId,
                title: message,
                messages:[{role: "user", content: message}]
            });
        }else {
            console.log("Updating thread...");
            thread.messages.push({role: "user", content: message});
        }
        console.log("Calling AI...");

        const assistantReply = await getGroqAPIResponse(message);

        console.log("AI Reply:", assistantReply);

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        console.log("Saving to DB...");
        await thread.save();
        res.json({reply: assistantReply});
    } catch (err) {
        console.error("Real Error:",err);
        res.status(500).json({error: err.message});
    }
});


export default router;