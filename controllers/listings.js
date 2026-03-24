const Listing = require("../models/listing");


//index middleware
module.exports.index = async (req, res) => {
    const allList = await Listing.find({});
    res.render("listing/index.ejs", { allList });
};

//New Listing Form
module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
};


//Listing Details
module.exports.listingDetails = async (req, res) => {
    const { id } = req.params;
    const listDetail = await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author"
        }
    }).populate("owner");
    if (!listDetail) {
        req.flash("error", "Requested Listing Does Not Exist !")
        return res.redirect("/listings");
    }
    res.render("listing/show.ejs", { listDetail });
};


//New Listing 
module.exports.newListing = async (req, res, next) => {
   let url= req.file.path;
   let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; 
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listing is Created !")
    res.redirect("/listings");
};

//Edit Form 
module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listDetail = await Listing.findById(id);
    if (!listDetail) {
        req.flash("error", "Requested Listing Does Not Exist !")
        return res.redirect("/listings");
    }
    req.flash("success", "Listing is Edited !")
    res.render("listing/edit", { listDetail });
};

//Update Listing
module.exports.updateListing =async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true, runValidators: true }
    );
    if(typeof req.file !== "undefined"){
        let url= req.file.path;
      let filename = req.file.filename;
     listing.image = {url,filename};  
     await listing.save(); 
    }
    
    if (!listing) {
        req.flash("error", "Requested Listing Does Not Exist!");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
};

//Delete Listing
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is Deleted !")
    res.redirect(`/listings`);
};