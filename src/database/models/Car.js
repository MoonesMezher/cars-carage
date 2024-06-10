const { Schema, model, default: mongoose } = require("mongoose");

const Car = model("Car", new Schema({
    name: {
        type: {
            AR: {
                type: String,
                required: true
            },
            EN: {
                type: String,
                required: true
            },
        },
        required: true
    },
    brand: {
        type: {
            AR: {
                type: String,
                required: true
            },
            EN: {
                type: String,
                required: true
            },
        },
        required: true
    },
    category: {
        type: {
            AR: {
                type: String,
                required: true
            },
            EN: {
                type: String,
                required: true
            },
        },
        required: true
    },
    pictures: {
        type: [String],
        required: true
    },
    price: {
        type: {
            dayly: {
                type: String,
            },
            weekly: {
                type: String,
            },
            monthly: {
                type: String,
            }
        }, 
    },
    description: {
        type: {
            AR: {
                type: String,
                required: true
            },
            EN: {
                type: String,
                required: true
            },
        },
        required: true
    },
    horse: { 
        type: String, 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    seatNumber: {
        type: Number, 
        required: true
    },
    topSpeed: {
        type: String, 
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    gear: {
        type: String, 
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    availabilityStartDate: {
        type: String,
    },
    availabilityEndDate: {
        type: String,
    }
}, { timestamps : true }))

module.exports = mongoose.model("Car") || Car