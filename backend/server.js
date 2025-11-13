const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 3000; // The port your server will run on

// --- Middleware ---
// 1. CORS: Allows your frontend (running on a different port) to talk to this backend.
app.use(cors());

// 2. Body Parser: Helps to read the JSON data sent from your frontend's <form>.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// --- API Endpoints ---

/**
 * @route   POST /api/search
 * @desc    Searches for available trains
 * @access  Public
 */
app.post('/api/search', (req, res) => {
    // 1. Get the search data from the frontend's request body
    const { from, to, date, trainClass, quota } = req.body;

    console.log("Received search request:");
    console.log("From:", from);
    console.log("To:", to);
    console.log("Date:", date);
    console.log("Class:", trainClass);
    console.log("Quota:", quota);

    // --- REAL DATABASE LOGIC WOULD GO HERE ---
    // In a real app, you would now query your PostgreSQL or MongoDB database
    // to find trains that match these criteria.
    //
    // e.g., const results = await db.trains.find({ from: from, to: to, ... });
    // --- END OF REAL DATABASE LOGIC ---


    // 3. For this demo, we'll just send back "mock" (fake) data.
    const mockTrainResults = [
        {
            trainNumber: "12001",
            trainName: "SHATABDI EXP",
            departs: "06:00",
            arrives: "12:00",
            duration: "6h 00m",
            availability: {
                "Sleeper (SL)": 150,
                "AC 3 Tier (3A)": 75,
                "AC 2 Tier (2A)": 30
            }
        },
        {
            trainNumber: "22439",
            trainName: "VANDE BHARAT",
            departs: "07:30",
            arrives: "11:30",
            duration: "4h 00m",
            availability: {
                "AC Chair car (CC)": 250,
                "Exec. Chair Car (EC)": 45
            }
        },
        {
            trainNumber: "12417",
            trainName: "PRAYAGRAJ EXP",
            departs: "22:10",
            arrives: "07:00",
            duration: "8h 50m",
            availability: {
                "Sleeper (SL)": 50,
                "AC 3 Tier (3A)": 15,
                "AC 2 Tier (2A)": 5,
                "AC 1st Class (1A)": 2
            }
        }
    ];

    // 4. Send the mock results back to the frontend as JSON
    res.json(mockTrainResults);
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});