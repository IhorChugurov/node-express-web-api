// The static import statement is used to import read only live bindings which are exported by another module.
// Earlier we installed the external modules express, cors and wrote them in dependencies in the package.json file
import express from "express";
import cors from "cors";
// Creating a variable to access the functions of the express module
const app = express();
// Creating a variable to setup options to a cors module
const corsOptions = {
    origin: "http://localhost:3033"
};

// Using cors as middleware in Express
app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Importing index.js creating earlier
// #2 in diagram
import db from "./app/models/index.js";
// Connecting to MongoDB using Mongoose
// #3 in diagram
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to REST API application." });
});

// Importing item.routes.js creating earlier
// #6 in diagram
import router from "./app/routes/item.routes.js";
app.use('/api/collections/item', router);


// Set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});