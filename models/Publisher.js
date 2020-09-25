const  mongoose  = require('mongoose');
const { Schema } = mongoose;

const publisherSchema = new Schema({
    title:  {
        type: String,
        required: true,
        unique: true
      },
    publisherId:Schema.ObjectId,
    Books:[{ type: Schema.Types.ObjectId, ref: 'Book' }],
    startedOn:{
        type: Date,
        required: true
      }
  });
  
module.exports = Publisher = mongoose.model('Publisher', publisherSchema);