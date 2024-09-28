const mongoose = require("mongoose");

const rentalHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to User model
        required: false
    },
    
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
    },
    quantity: {
        type: Number,
        
    },
    startDate: {
        type: Date,
        
    },
    endDate: {
        type: Date,
    
    },
    totalDays: {
        
    },
    totalAmount: {
        type: Number,
    },
});

const RentalHistory = mongoose.model("RentalHistory", rentalHistorySchema);

module.exports = {
    RentalHistory,
};
