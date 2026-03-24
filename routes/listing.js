const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing} = require("../middelware.js");
const { populate } = require("../models/reviews.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



//Index Route
//Create route
router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.newListing));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route
//update route
//delete route
router
.route("/:id")
.get(wrapAsync(listingController.listingDetails))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));


module.exports = router;