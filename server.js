const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mentalHealthDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the data models
const CounselingSchema = new mongoose.Schema({
  feelings: String,
  submittedAt: { type: Date, default: Date.now }
});

const TrackingSchema = new mongoose.Schema({
  mood: String,
  stressLevel: Number,
  submittedAt: { type: Date, default: Date.now }
});

const Counseling = mongoose.model('Counseling', CounselingSchema);
const Tracking = mongoose.model('Tracking', TrackingSchema);

// Routes
// Anonymous Counseling Submission
app.post('/submit-counseling', async (req, res) => {
  const { feelings } = req.body;

  const newCounseling = new Counseling({
    feelings
  });

  try {
    await newCounseling.save();
    res.status(200).send({ message: 'Feelings submitted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error submitting feelings' });
  }
});

// Mental Health Tracking Submission
app.post('/submit-tracking', async (req, res) => {
  const { mood, stressLevel } = req.body;

  const newTracking = new Tracking({
    mood,
    stressLevel
  });

  try {
    await newTracking.save();
    res.status(200).send({ message: 'Mood and stress level logged successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging mood and stress level' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = 5000;

// Middleware for parsing request bodies and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/student_mental_health', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Import the Models
const Counseling = require('./models/counselingModel');
const Tracking = require('./models/trackingModel');

// Route to generate the report
app.get('/generate-report', async (req, res) => {
  try {
    // Fetch all counseling data
    const counselingData = await Counseling.find();
    
    // Fetch all tracking data
    const trackingData = await Tracking.find();

    // Generate the feelings summary from counseling data
    const feelingsSummary = counselingData.reduce((summary, entry) => {
      if (entry.feelings in summary) {
        summary[entry.feelings] += 1;
      } else {
        summary[entry.feelings] = 1;
      }
      return summary;
    }, {});

    // Generate the mood summary from tracking data
    const moodSummary = trackingData.reduce((summary, entry) => {
      if (entry.mood in summary) {
        summary[entry.mood] += 1;
      } else {
        summary[entry.mood] = 1;
      }
      return summary;
    }, {});

    // Calculate the average stress level from tracking data
    const averageStressLevel = trackingData.reduce((total, entry) => total + entry.stressLevel, 0) / trackingData.length;

    // Compile the report
    const report = {
      feelingsSummary,
      moodSummary,
      averageStressLevel: averageStressLevel.toFixed(2),
      totalCounselingSessions: counselingData.length,
      totalTrackingEntries: trackingData.length,
      trackingData,
      counselingData,
    };

    // Send the report as a response
    res.status(200).json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
