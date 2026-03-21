import express from 'express';
import axios from 'axios';
 const app = express();
 const port = 3000;
 app.use(express.static('public'));
 app.use(express.json());
 
 
 app.get('/', (req, res) => {
     res.render('index.ejs');
 });

 app.post('/weather', async (req, res) => {
     const { lat, lon } = req.body;
     try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dd4bb96c603bf823c6826b18001ba1f4&units=metric`);
         const data = response.data;
         const weather = {
             temp: data.main.temp,
             description: data.weather[0].description,
             icon: data.weather[0].icon,
             city: data.name
         };
         res.json(weather);
     } catch (error) {
         console.error('Error fetching weather data:', error);
         res.status(500).json({ error: 'Failed to fetch weather' });
     }
 });

 app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
 });