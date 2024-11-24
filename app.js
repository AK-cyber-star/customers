import Express from "express";
import User from "./models/user.js";

// router setup
export const router = Express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (err) {
        console.error("Error at GET ALL route => ", err.message)
        res.status(500).json({"error" : err.message});
    }
});

// Get a specific item by ID
router.get(":/id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) { return res.status(400).json({"Error" : "User not found"})}
        res.status(201).json(user);
    } catch (err) {
        console.error("Error at GET By Id route => ", err.message)
        res.status(500).json({"error" : err.message});
    }
});

// Create a new user
router.post("/", async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const newUser = new User({
            username, email, password
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error at POST new User => ", err.message)
        res.status(400).json({"error" : err.message});
    }
});

// Update an existing user
router.put(":/id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!user) return res.status(404).json({"message" : "User not found"});
        res.status(201).json(user);
    } catch (err) {
        console.error("Error at POST new User => ", err.message)
        res.status(400).json({"error" : err.message});
    }
});

// Delete an User
router.delete(":/id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
