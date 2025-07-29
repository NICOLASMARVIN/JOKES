import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// For ESM __dirname emulation
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const params = [
    "blacklistFlags=nsfw,religious,racist",
    "idRange=0-100"
];

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/joke/${categories.join(",")}?${params.join("&")}`);
        const joke = response.data;

        res.render('index', { joke });
    } catch (error) {
        res.status(500).send(`Error fetching joke: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
