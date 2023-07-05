const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");
const fs = require("fs");
const cron = require("node-cron");
const { startOfDay, isSameDay, format } = require("date-fns");

const app = express();
const port = 5000;

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the data schema
const eventDataSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    srcAddress: {
      type: String,
      required: true,
    },
    timeout: {
      type: String,
      required: true,
    },
    protocol: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model based on the schema
const EventData = mongoose.model("EventData", eventDataSchema);

const eventDataVpnSchema = new mongoose.Schema(
  {
    callerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    uptime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model based on the schema
const VpnData = mongoose.model("EventDataVpn", eventDataVpnSchema);

// POST route to save the data
app.post("/save-connections", async (req, res) => {
  const { country, city, srcAddress, timeout, protocol } = req.body.eventData;
  const eventData = new EventData({
    country: country || "N/A",
    city: city || "N/A",
    srcAddress: srcAddress || "N/A",
    timeout: timeout || "N/A",
    protocol: protocol || "N/A",
  });

  try {
    // Create a new document in the EventData collection
    const savedData = await EventData.create(eventData);
    console.log("Data saved:", savedData);

    res.sendStatus(200); // Sending a success response
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
});

app.get("/connections", async (req, res) => {
  try {
    // Retrieve all documents from the EventData collection
    const eventData = await EventData.find();
    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
});

cron.schedule("55 59 23 * * *", async () => {
  try {
    const eventData = await EventData.find();

    // Filter the eventData array for data with timestamp of the current date
    const currentDate = startOfDay(new Date());
    const filteredEventData = eventData.filter((data) => {
      const dataDate = startOfDay(new Date(data.createdAt));
      return isSameDay(currentDate, dataDate);
    });

    // Format the timestamp to a readable date format
    const formattedEventData = filteredEventData.map((data) => ({
      ...data._doc,
      timestamp: format(new Date(data.createdAt), "MMM d, yyyy h:mm a"),
    }));

    const csvWriter = createCsvWriter({
      path: path.join(
        __dirname,
        "logs",
        `ConnectionLogs_${getDateFormatted()}.csv`
      ),
      header: [
        { id: "country", title: "Country" },
        { id: "city", title: "City" },
        { id: "srcAddress", title: "Source Address" },
        { id: "timeout", title: "Timeout" },
        { id: "protocol", title: "Protocol" },
        { id: "timestamp", title: "Timestamp" },
      ],
    });

    await csvWriter.writeRecords(formattedEventData);

    console.log("Data export completed successfully");
  } catch (error) {
    console.error("Error exporting data:", error);
  }
});

app.post("/save-connections-vpn", async (req, res) => {
  const { callerId, name, service, uptime } = req.body.eventDataVpn;
  const eventData = new VpnData({
    callerId: callerId || "N/A",
    name: name || "N/A",
    service: service || "N/A",
    uptime: uptime || "N/A",
  });

  try {
    // Create a new document in the EventData collection
    const savedData = await VpnData.create(eventData);
    console.log("Data saved:", savedData);

    res.sendStatus(200); // Sending a success response
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
});

app.get("/connections-vpn", async (req, res) => {
  try {
    // Retrieve all documents from the EventData collection
    const eventData = await VpnData.find();
    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
});

cron.schedule("55 59 23 * * *", async () => {
  try {
    const eventData = await VpnData.find();

    // Filter the eventData array for data with timestamp of the current date
    const currentDate = startOfDay(new Date());
    const filteredEventData = eventData.filter((data) => {
      const dataDate = startOfDay(new Date(data.createdAt));
      return isSameDay(currentDate, dataDate);
    });

    // Format the timestamp to a readable date format
    const formattedEventData = filteredEventData.map((data) => ({
      ...data._doc,
      timestamp: format(new Date(data.createdAt), "MMM d, yyyy h:mm a"),
    }));

    const csvWriter = createCsvWriter({
      path: path.join(
        __dirname,
        "VpnLogs",
        `VpnConnectionLogs_${getDateFormatted()}.csv`
      ),
      header: [
        { id: "callerId", title: "Caller-Id" },
        { id: "name", title: "Name" },
        { id: "service", title: "Service" },
        { id: "uptime", title: "Uptime" },
        { id: "timestamp", title: "Timestamp" },
      ],
    });

    await csvWriter.writeRecords(formattedEventData);

    console.log("Data export completed successfully");
  } catch (error) {
    console.error("Error exporting data:", error);
  }
});

function getDateFormatted() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
