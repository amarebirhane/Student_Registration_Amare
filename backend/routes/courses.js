import express from 'express';
import stripePackage from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';
import Course from '../models/Course.js'

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.use(cors()); // Enable CORS for all routes

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.json({success:false, message: 'Failed to fetch courses' });
  }
});

// Add a course (admin feature)
router.post('/courses', async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newCourse = new Course({ title, description, price });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

// Create a payment session
router.post('/create-payment-session', async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: course.price * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/dashboard', // Redirect to dashboard on success
      cancel_url: 'http://localhost:5173/course-list', // Redirect to course list on cancel
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create payment session' });
  }
});
export default router;