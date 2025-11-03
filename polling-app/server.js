const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Polling App - GitOps Demo</h1>
    <p>Environment: ${process.env.ENV || 'unknown'}</p>
    <p>Version: 1.0.0</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
