import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./app.js";

import { connectToDatabase } from "./config/database.js";

const app = Express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

connectToDatabase()
    .then(() => {
        // routers
        app.use('/api/items', router);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    })
    .catch(error => {
        console.error(`Failed to connect to teh database:`, error)
    });