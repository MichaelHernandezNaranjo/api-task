const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const companyRouter = require('./routes/company');
const authRouter = require('./routes/authRouter');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/api", (req , res) => {
    res.json({
        mensaje: "Api"
    });
});
app.use('/api/company', companyRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("nodejs app running...");
});