const express = require("express");
const multer = require("multer");
const Cameraman = require("../models/cameraMan"); // Cameraman model
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Folder to store profile pictures
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique file name
    }
});
const upload = multer({ storage: storage });

// Cameraman Signup Route
router.post("/signup", upload.single('profilePicture'), async (req, res) => {
    const { Name, address, email, phone, password, pricingPerDay } = req.body;

    try {
        // Check if the email is already registered
        const existingCameraman = await Cameraman.findOne({ "contactDetails.email": email });
        if (existingCameraman) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Store profile picture if uploaded
        let profilePictureUrl = "https://via.placeholder.com/150";  // Default placeholder
        if (req.file) {
            profilePictureUrl = req.file.path;  // Store file path if picture is uploaded
        }

        // Create a new Cameraman
        const newCameraman = new Cameraman({
            Name,
            address,
            contactDetails: { email, phone },
            password,  // Store plain text password as requested
            pricingPerDay,
            profilePicture: profilePictureUrl  // Store profile picture URL or path
        });

        // Save the cameraman to the database
        await newCameraman.save();

        res.status(201).json({ message: "Cameraman registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error in signup", error });
    }
});

module.exports = router;
