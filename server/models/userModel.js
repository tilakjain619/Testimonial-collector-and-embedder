const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Pre middleware to delete testimonials associated with the user
userSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()["_id"];
    const testimonials = await mongoose.model('Testimonial').find({ 'createdBy': userId });
  
    if (testimonials.length > 0) {
      await mongoose.model('Testimonial').deleteMany({ 'createdBy': userId });
    }
  
    next();
  });
module.exports = mongoose.model("Users", userSchema);