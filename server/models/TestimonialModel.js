const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images:{
    type: Object,
    required: true,
    default: []
},
  testimonials: [
    {
      name:{
        type: String,
        default: ""
      },
      testimonial: {
        type: String,
        trim: true,
        required: true
      },
      ratings: {
        type: Number,
        min: 1,
        max: 5
      },
      submittedOn: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;