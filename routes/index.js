const express = require('express');

const router = express.Router();
const Book = require('../models/Book')
const Publisher = require('../models/Publisher')

router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    next()
  });


// router.get('/allBooks',(req,res) => {
//     const getBooks = Book.find();
//     console.log(getBooks, 'BOOKS'); 
// });



router.post('/addBook', async (req,res) => {
    console.log((req.body), 'req');
    const doc = await  Publisher.findOne({"title": req.body.publisherName }).exec();

    console.log(doc._id)
    // get a publisher 
    // const publisherTitle = "Test Publisher2";
    // const docs = Publisher.findOne({"title": publisherTitle},function (err, docs) { 
    // if (err){ 
    //     return err;
    // } 
    // else{ 
    //     return docs;
    // }});

   /*
   Books: [],
  _id: 5f6dd218ec325f5720b2e224,
  title: 'Test Publisher2',
  startedOn: 2020-09-20T00:00:00.000Z,
  __v: 0*/

//   console.log(docs,'FFF');

    const newBook = new Book({
    title :req.body.title,
    author :req.body.author,
    pages :req.body.pages,
    available :req.body.available,
    publisherName:req.body.publisherName,
    publisherId: doc._id,

    // publishDate:req.body.publishDate,
    // publisherId:req.body.
    });

    newBook.save().then(book => res.json(book)).catch( (err) => {
      res.json({"errrrr": err})
    });
});


router.post('/addPublisher',(req,res) => {
    console.log((req.body.startedOn), 'req');

    const newPublisher = new Publisher({
        title:  req.body.title, 
        startedOn:req.body.startedOn
    });

    newPublisher.save().then(pub => res.json(pub)).catch( (err) => {
        console.log(err);
    }
    );

});

router.get('/getAllPublishers', async (req,res) => {
    console.log((req.body), 'req');
const publisherDocs = await Publisher.find({}).exec();
 if (publisherDocs){
     return res.json(publisherDocs)
 }else {
     return res.json({})
 }})

 router.get('/getAllBooks', async (req,res) => {
    const bookDocs = await Book.find({}).exec();
    console.log(bookDocs , "BOOKS")
 if (bookDocs){
     return res.json(bookDocs)
 }else {
     return res.json({})
 }})




 router.post('/updateBooks', async (req,res) => {
    /*
    req.body.BookTitle
    req.body.BookPublisher
    */
 // get the doc for book title 

 const bookDoc = await Book.findOne({"title": req.body.bookTitle });
 const publisherDoc = await Publisher.findOne({"title": req.body.publisherName});
    console.log(publisherDoc, 'pubs')

    const isDone = await Publisher.findByIdAndUpdate(
        {_id : publisherDoc._id},
        {"$addToSet": { "Books": bookDoc._id }},
        function (err, raw) {
            if (err) return err ;
            console.log('The raw response from Mongo was ', raw);
        });
    console.log(isDone , 'DONE');

    if (isDone) {
            return res.json(isDone);
    }
        return res.json({"error": "error....."})
    
    
});

module.exports = router