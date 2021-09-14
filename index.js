//Initial config
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const db = require('./models');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

//DB Sync
db.sequelize.sync();

//Cors config and body-parser
app.use(cors(config.application.corsOptions));
app.use(express.json());

//Routes
app.use('/', authRoutes);
app.use('/', userRoutes);



const PORT = 3001;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
