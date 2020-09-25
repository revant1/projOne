const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title:  {
    type: String,
    required: true
  }, 
  author:  {
    type: String,
    required: true,
    unique: true
  }, 
  date: { type: Date, default: Date.now },
  pages:  {
    type: Number,
    required: true
  }, 
  publisherName: {
    type: String,
    required: true
  }, 
  publisherId:[{ type: Schema.Types.ObjectId, ref: 'Publisher' }],
  publishDate: {
    type: Date
  },
  available: Number,
  checkout: [ Schema.Types.Mixed ]
});

module.exports = Book = mongoose.model('Book', bookSchema);

