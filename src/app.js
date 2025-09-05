import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.route.js';
import { generateRandomOrder } from './utils/orderGenerator.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

setInterval(() => {
    generateRandomOrder();
}, Math.floor(Math.random() * (180000 - 120000 + 1)) + 120000);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Welcome to the Delivery Partner System API!');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});

app.use('/api', router);


