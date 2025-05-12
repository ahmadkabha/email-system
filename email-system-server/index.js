require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userController = require('./src/modules/users/controller/user.controller');

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const router = express.Router();
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
