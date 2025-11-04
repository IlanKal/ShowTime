import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";


try {
    app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
    });
} catch (error) {
    // קטע זה יתפוס בעיקר שגיאות נדירות ב-startup, כמו בעיה בפורט
    console.error("Server startup error:", error);
    process.exit(1); 
}


// mongoose.connect(MONGO_URI)
// .then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// })
// .catch((error) => {
//     console.log("MongoDB connection error:", error);
// });