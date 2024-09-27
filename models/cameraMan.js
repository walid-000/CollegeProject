const mongoose = require("mongoose");

const cameramanSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    address: { type: String, required: true },
    contactDetails: {
        email: { type: String, required: true, },
        phone: { type: String, required: true }
    },
    password: { type: String, required: true },  
    
    bio: { type: String, default: "No bio available" },
    pricingPerDay: { type: Number, required: true },
    availableDates: { type: [Date], default: [] },
    profilePicture: { type: String, default: "https://via.placeholder.com/150" },
    createdAt: { type: Date, default: Date.now }
});

const Cameraman = mongoose.model("Cameraman", cameramanSchema);
module.exports = Cameraman;
