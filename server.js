const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const { createTables } = require("./db/initializeDatabase"); // Importar la función de inicialización

const app = express();
const PORT = process.env.PORT || 8000;

// Ejecutar la inicialización de la base de datos
createTables();

app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "mainLayout" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Monolito con Node.js y Handlebars" });
});

const productosRouter = require("./routes/products");
app.use("/products", productosRouter);
const ventasRouter = require("./routes/sells");
app.use("/sells", ventasRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
