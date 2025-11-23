const express = require('express');
const cors = require('cors');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
