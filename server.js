const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.json({
    message: "Streamflix proxy is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
