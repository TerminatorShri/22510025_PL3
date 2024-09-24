import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.get("/about", (req, res) => {
  res.send("This is the About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact us at: email@example.com");
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

app.get("/products/:category/:productId", (req, res) => {
  const { category, productId } = req.params;

  res.json({
    category: category,
    productId: productId,
  });
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
