const books = require("../models/bookModel");

//Add a book
exports.addBookController = async (req, res) => {
    console.log("Inside BookController");
    res.status(200).json("Upload book request received");
    
    // const { title, author, edition, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, sellerMail } = req.body;
    // console.log(title, author, edition, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, sellerMail);
    try{
        
    }
    catch(error){
        console.log(error);
    }
    
}