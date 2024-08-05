const Testimonial = require('../models/TestimonialModel');
const cloudinary = require('cloudinary').v2;

const TestimonialControl = {
    createTestimonialPage: async (req, res) => {
        try {
            const { id } = req.user;
            const { description, images } = req.body;
            if (!images) return res.status(400).json({ msg: "No images uploaded" });
            if (!description) {
                return res.status(400).json({ msg: "Description is required" });
            }

            // Create a new testimonial page
            const newPage = new Testimonial({
                description, createdBy: id, images
            });

            // Save the page to the database
            await newPage.save();

            res.status(201).json({ msg: "Testimonial page created successfully", newPage });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    // Function to get all testimonial pages created by the current user
    getTestimonialPages: async (req, res) => {
        try {
            const userId = req.user.id; // Get the current user's ID from the authenticated request

            // Find pages created by the current user
            const pages = await Testimonial.find({ createdBy: userId });

            // Respond with the pages found
            res.json(pages);
        } catch (error) {
            // Handle any errors and respond with an appropriate status and message
            res.status(500).json({ msg: error.message });
        }
    },
    // Function to delete a testimonial page
    deleteTestimonialPage: async (req, res) => {
        try {
            const id = req.params.id;
            const userId = req.user.id; // Get the current user's ID from the authenticated request

            // Find the page to delete and ensure it was created by the current user
            const pageToDelete = await Testimonial.findOne({ _id: id, createdBy: userId });

            if (!pageToDelete) {
                return res.status(404).json({ msg: "Testimonial page not found or you don't have permission to delete it" });
            }

            // Delete the page from the database
            await Testimonial.findByIdAndDelete(id);

            // Optionally, delete any associated testimonials if necessary
            // Uncomment the following lines if you need to delete associated testimonials
            // await Testimonial.deleteMany({ 'testimonials.page': id });
            console.log("oooo");

            res.json({ msg: "Testimonial page deleted successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    editTestimonialPage: async (req, res) => {
        try {
            const { id } = req.params; // Get the testimonial page ID from the URL
            const { description, images } = req.body; // Get the new description and images from the request body
            const userId = req.user.id; // Get the current user's ID

            // Find the testimonial page to update
            const pageToUpdate = await Testimonial.findOne({ _id: id, createdBy: userId });
            if (!pageToUpdate) {
                return res.status(404).json({ msg: "Testimonial page not found or you don't have permission to edit it" });
            }

            // Update the description
            if (description) pageToUpdate.description = description;

            // Handle image upload if new images are provided
            if (images && images.length > 0) {
                pageToUpdate.images = images; // Update with new image URLs
            }

            // Save the updated page
            await pageToUpdate.save();

            res.json({ msg: "Testimonial page updated successfully", pageToUpdate });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    // Function to add a review to a testimonial page
    addTestimonial: async (req, res) => {
        try {
            const { id } = req.params; // Get the testimonial page ID from the URL
            const { testimonial, ratings, name } = req.body; // Get the review details from the request body

            // Validate the incoming data
            if (!testimonial || !ratings) {
                return res.status(400).json({ msg: "Review and ratings are required" });
            }
            if (ratings < 1 || ratings > 5) {
                return res.status(400).json({ msg: "Ratings must be between 1 and 5" });
            }

            // Find the testimonial page
            const page = await Testimonial.findById(id);
            if (!page) {
                return res.status(404).json({ msg: "Testimonial page not found" });
            }

            // Add the new review to the testimonials array
            page.testimonials.push({
                name,
                testimonial,
                ratings
            });

            // Save the updated page
            await page.save();

            res.json({ msg: "Review added successfully", page });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    // Function to get all testimonials for a specific page
  getTestimonialsForPage: async (req, res) => {
    try {
      const { id } = req.params; // Get the testimonial page ID from the URL

      // Find the testimonial page by ID
      const page = await Testimonial.findById(id);// Only select the testimonials field
      if (!page) {
        return res.status(404).json({ msg: "Testimonial page not found" });
      }

      res.json(page); // Return the list of testimonials
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = TestimonialControl;