const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");


//MongoDB Conection
main()
    .then(() => {
        console.log("DataBase Connected");
    })
    .catch((err) => {
        console.log("Error In Conection");
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'69c198731aa833a2408fb0ff'}))
    await Listing.insertMany(initData.data);
    console.log("Data Inseted");
}

initDB();