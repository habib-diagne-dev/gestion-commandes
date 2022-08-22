const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 4000

const app = express();

// Définition des routes
const departementsRouter = require("./routes/departements")
const fournisseursRouter = require("./routes/fournisseurs")
const produitsRouter = require("./routes/produits")

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Chargement des routes
app.use(departementsRouter)
app.use(fournisseursRouter)
app.use(produitsRouter)

app.listen(
    PORT,
    () => console.log(`Connected to the server in port : ${PORT}`)
)