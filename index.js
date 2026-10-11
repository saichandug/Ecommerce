const express = require("express");
const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const connectDB = require("./connect/db");
const app = express();
const errorHandler = require("./middleware/errorHandler")

const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use((req,res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
})
app.use("/auth", userRoutes)
app.use("/products", productsRoutes)

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})
app.use(errorHandler);
app.listen(PORT, () => {
    connectDB();
    console.log("server listening on " + PORT);
})