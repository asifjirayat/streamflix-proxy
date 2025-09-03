const app = require("./api/index.js");
const PORT = process.env.PORT || 3001;

// Only for local development
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
