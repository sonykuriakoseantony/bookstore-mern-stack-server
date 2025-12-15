const books = require("../models/bookModel");

//Add a book
exports.addBookController = async (req, res) => {
    console.log("Inside BookController");
    //get data from req body
    const { title, author, pages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category } = req.body;
    const sellerMail = req.payload; //retrieved from jwtMiddleware
    const uploadImg = req.files.map(file => file.filename);
    
    console.log(title, author, pages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, sellerMail);
    
    
    
    try{
        const existingBook = await books.findOne({title, sellerMail})
        if(existingBook){
            res.status(401).json("Book already exists! Upload a different book");
        }
        else{
            const newBook = await books.create({
                title, author, pages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, sellerMail
            })
            res.status(200).json(newBook);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
    
}