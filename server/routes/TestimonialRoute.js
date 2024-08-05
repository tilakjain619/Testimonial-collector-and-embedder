const testimonialController = require('../controllers/TestimonialControl');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post('/create', auth, testimonialController.createTestimonialPage)
router.get('/get-testimonials-page', auth, testimonialController.getTestimonialPages)
router.delete('/delete-testimonials-page/:id', auth, testimonialController.deleteTestimonialPage)
router.put('/edit-testimonials-page/:id', auth, testimonialController.editTestimonialPage);
router.post('/add-testimonial/:id', testimonialController.addTestimonial);
router.get('/testimonials/:id', testimonialController.getTestimonialsForPage);

module.exports = router;