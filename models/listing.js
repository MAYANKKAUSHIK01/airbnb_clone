const mongoose = require("mongoose");
const Review = require("./reviews.js");
const reviews = require("./reviews.js");

const listingSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
   url:String,
   filename:String,
},
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
reviews: {
    type: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    default: [],
},

owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const listing = mongoose.model("listing",listingSchema);

module.exports = listing;