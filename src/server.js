require('dotenv').config();
const app = require('./app');
const DB = require('./configs/dbConfig');

const PORT = process.env.PORT || 3000;

DB.authenticate().then(() => {
    console.log('DB connected');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
