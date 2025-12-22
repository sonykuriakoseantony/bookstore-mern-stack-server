const books = require("../models/bookModel");

//Add a book
exports.addBookController = async (req, res) => {
    console.log("Inside BookController");
    //get data from req body
    const { title, author, pages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category } = req.body;
    const sellerMail = req.payload; //retrieved from jwtMiddleware
    const uploadImg = req.files.map(file => file.filename);
    console.log(title, author, pages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, sellerMail);
    try {
        console.log("Check All 3 images uploaded");
        console.log(uploadImg);
        const existingBook = await books.findOne({ title, sellerMail })
        if (existingBook) {
            res.status(409).json("Book already exists! Upload a different book");
        }
        else {
            const newBook = await books.create({
                title, author, pages, imageURL, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, sellerMail
            })
            res.status(200).json(newBook);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// get home page books - latest 4 books - Authorized users only
exports.getHomeBookController = async (req, res) => {
    console.log("Inside get home books Controller");
    try {
        const homeBooks = await books.find().sort({ _id: -1 }).limit(4);
        res.status(200).json(homeBooks)
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// get all books except loggedin user - Authorized users only
exports.getUserAllBooksController = async (req, res) => {
    console.log("Inside getUserAllBooksController");
    const loginUserMail = req.payload;

    const searchKey = req.query.search;
    console.log(searchKey);
    

    try {
        const allBooks = await books.find({ sellerMail:{ $ne:loginUserMail }, title:{ $regex:searchKey, $options:'i' } });
        res.status(200).json(allBooks)
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// get all books uploaded by user - Authorized users only
exports.getUserProfileBooksController = async (req, res) => {
    console.log("Inside getUserProfileBooksController");
    const loginUserMail = req.payload;

    try {
        const userBooks = await books.find({ sellerMail: { $eq: loginUserMail } });
        res.status(200).json(userBooks)
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// get user bought books - Authorized users only
exports.getUserBoughtBooksController = async (req, res) => {
    console.log("Inside getUserBoughtBooksController");
    const loginUserMail = req.payload;

    try {
        const userBoughtBooks = await books.find({ buyerMail : loginUserMail });
        res.status(200).json(userBoughtBooks)
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

//get a single book details
exports.viewSingleBookController = async (req, res) => {
    console.log("Inside viewSingleBookController")
    const {id} = req.params;
    try{
        const userBook = await books.findById({_id : id})
        res.status(200).json(userBook);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
        