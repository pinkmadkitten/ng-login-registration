const express = require('express');
const path = require('path');
const cors = require('cors');
const { router } = require('./router');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
