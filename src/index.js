const express = require('express');
const cors = require('cors');


const app = express();

//middleware
app.use(cors());
app.use(express.json());
const { requestLogger } = require('./middleware/logger');
app.use(requestLogger);

// health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
const routes = require('./routes');
app.use('/api', routes);
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);



// server
const { config } = require('./config');
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
