const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Testing');
});

app.listen(PORT, console.log(`Listening at port: ${PORT}...`));