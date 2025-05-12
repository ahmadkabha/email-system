require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./src/modules/users/routes/user.routes');
const emailRouter = require('./src/modules/email/routes/email.routes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/emails', emailRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
