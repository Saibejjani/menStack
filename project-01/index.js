const express = require('express');

const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

//connection

mongoose
  .connect('mongodb://127.0.0.1:27017/project-1')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('mongo error' + err);
  });
//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
//Routes
app.get('/users', async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
      <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
        .join('')}
      </ul>
      `;
  res.send(html);
});

app.get('/api/users', async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route('/api/users/:id')
  .get(async (req, res) => {
    let user;
    try {
      user = await User.findById(req.params.id);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {});
    return res.json('success');
  })
  .delete(async (req, res) => {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: 'success' });
  });

app.post('/api/users', async (req, res) => {
  const body = req.body;

  if (!body || !body.first_name || !body.gender || !body.email) {
    return res.status(400).json({ msg: 'All fields are req...' });
  }
  let status;
  try {
    status = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
  } catch {
    return res.status(400).json({ msg: 'error' });
  }

  return res.status(201).json({ msg: 'success' });
});

app.listen(port, () => {
  console.log(`server started at http:localhost:${port}`);
});
