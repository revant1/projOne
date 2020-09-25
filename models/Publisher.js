const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const publisherSchema = new Schema({
    title:  String, 
    publisherId:Schema.ObjectId,
    Books:[{ type: Schema.Types.ObjectId, ref: 'Book' }],
    startedOn:Date,

  });
  
module.exports = Publisher = mongoose.model('Publisher', publisherSchema);