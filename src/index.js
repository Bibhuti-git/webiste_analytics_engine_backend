const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const autheRoutes = require('./routes/authroutes');
const analyticsRoutes = require('./routes/analyticsroutes');
const apiLimiter = require('./middleware/rateLimiter');
const setUpSwagger = require('./config/swagger');
const passport = require('passport');
// const onw = require('../src')

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors());
// app.use(helmet());
// app.use(morgan('dev'));

app.use(apiLimiter) ;
setUpSwagger(app);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', autheRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🥳`));
