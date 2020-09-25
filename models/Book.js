const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  Id: {type:Schema.ObjectId, auto:true},
  title:  String, 
  author: String,
  date: { type: Date, default: Date.now },
  pages: Number,
  publisherId:[{ type: Schema.Types.ObjectId, ref: 'Publisher' }],
  publishDate: Date,
  available: Number,
  checkout: [ Schema.Types.Mixed ]
});

module.exports = Book = mongoose.model('Book', bookSchema);

