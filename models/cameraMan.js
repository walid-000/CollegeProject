const mongoose = require("mongoose");

const cameramanSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    },
    fullName: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    contactDetails: {
        email: { type: String, },
        phone: { type: String, }
    },
    bio: {
        type: String,
        default: "No bio available"
    },
    pricingPerDay: {
        type: Number,

    },
    availableDates: {
        type: [Date],  // Array of available dates
        default: []
    },
    profilePicture: {
        type: String,  // URL or path to the profile picture
        default: "https://via.placeholder.com/150"  // Default placeholder image
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cameraman = mongoose.model("Cameraman", cameramanSchema);

module.exports = Cameraman;
