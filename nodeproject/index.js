require('dotenv').config();

const express = require('express');
const app = express();
const connectdb = require('./db/db');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes=require('./routes/loginRoutes');
app.use(express.json()); 
connectdb();

app.use('/api', signupRoutes);
app.use('/api',loginRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
