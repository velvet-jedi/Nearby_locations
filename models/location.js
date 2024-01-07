const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// for assigning new mongo atlas collection document
const locationSchema = new Schema({
  name: String,
  address: String,
  category: String,
  longitude: Number,
  latitude: Number,
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      default: 'Point' 
    },
    coordinates: {
      type: [Number],
      reuired: true
    }
  }
})

// Create individual indexes for latitude and longitude
locationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema)

