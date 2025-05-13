const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Informe o nome da cidade usando ?city=' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    console.log("Chave usada:", process.env.WEATHER_API_KEY);
    console.log("Cidade:", city);


    const response = await axios.get(url);
    const data = response.data;

    res.json({
      cidade: data.name,
      temperatura: `${data.main.temp}°C`,
      umidade: `${data.main.humidity}%`,
      clima: data.weather[0].description
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do clima. Verifique o nome da cidade ou tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});