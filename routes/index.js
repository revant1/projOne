const express = require('express');

const router = express.Router();
const Book = require('../models/Book')
const Publisher = require('../models/Publisher')

router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    next()
  });


router.get('/allBooks',(req,res) => {
    const getBooks = Book.find();
    console.log(getBooks, 'BOOKS'); 
});

router.post('/createBook',(req,res) => {
    // console.log((req.body), 'req');
    
    // get a publisher 
    const publisherTitle = "Test Publisher2";
    const docs = Publisher.findOne({"title": publisherTitle},function (err, docs) { 
    if (err){ 
        return err;
    } 
    else{ y
        return docs;
    }});

   /*
   Books: [],
  _id: 5f6dd218ec325f5720b2e224,
  title: 'Test Publisher2',
  startedOn: 2020-09-20T00:00:00.000Z,
  __v: 0*/

  console.log(docs,'FFF');

    const newBook = new Book({
    title :req.body.title,
    author :req.body.author,
    pages :req.body.pages,
    available :req.body.available,
    publishDate:req.body.publishDate,
    // publisherId:req.body.
    });

    newBook.save().then(book => res.json(book)).catch( (err) => {
        res.statusCode(401);
        res.statusMessage({"error":err});
    });
});


router.post('/addPublisher',(req,res) => {
    console.log((req.body), 'req');

    const newPublisher = new Publisher({
        title:  req.body.title, 
        startedOn:req.body.startedOn
    });

    newPublisher.save().then(pub => res.json(pub)).catch( (err) => {
        res.statusCode(401);
        res.statusMessage({"error":err});
    }
    );

});

// router.post('/map',(req,res) => {
//     console.log((req.body), 'req');

//     const newPublisher = new Publisher({
//         title:  req.body.title, 
//         startedOn:req.body.startedOn
//     });

//     newPublisher.save().then(pub => res.json(pub)).catch( (err) => {
//         res.statusCode(401);
//         res.statusMessage({"error":err});
//     }
//     );

// });

module.exports = router