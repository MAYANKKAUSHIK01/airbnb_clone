const express = require("express");
const router = express.Router({mergeParams:true});
const Review = require("../models/reviews");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middelware.js");
const reviewController = require("../controllers/reviews.js");


//Reviews Post Route
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//Reviews Post Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReviews));


module.exports = router;