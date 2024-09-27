const Score = require('../models/Score'); // Import the Score model

// Function to get the score by eventId
const getScore = async (req, res) => {
    const { eventId } = req.params;

    try {
        const score = await Score.findOne({ event: eventId });
        if (!score) {
            return res.status(404).json({ message: 'Score not found for this event' });
        }
        return res.status(200).json(score); // Return the score document
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to post/update the score
const postScore = async (req, res) => {
    const { eventId, avgScore } = req.body; // Assuming eventId and avgScore are sent in the request body
    const userRole = req.user.role; // Get the user's role from the authenticated user
    const userId = req.user.userId; // Extract the user ID from the authenticated user

    console.log(userId);

    try {
        let score = await Score.findOne({ event: eventId });

        // If score document does not exist, create a new one
        if (!score) {
            score = new Score({ event: eventId, guest: [], faculty: null, admin: null, user: [] });
        }

        // Check if the user has already submitted feedback
        if (score.user.includes(userId)) {
            return res.status(400).json({ message: 'You have already submitted feedback.' });
        }

        // Append the user ID to the user array
        score.user.push(userId);

        // Depending on the user role, update the appropriate field
        if (userRole === 'faculty mentor') {
            score.faculty = avgScore;
        } else if (userRole === 'admin') {
            score.admin = avgScore; // Update admin score
        } else {
            score.guest.push(avgScore);
        }

        await score.save(); // Save the score document
        return res.status(200).json({ message: 'Score updated successfully', score });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getScore,
    postScore,
};
