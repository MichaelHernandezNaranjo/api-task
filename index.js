const express = require("express");
const app = express();

const roleRouter = require('./routes/roleRouter');
const loginRouter = require('./routes/loginRouter');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api", (req , res) => {
    res.json({
        mensaje: "Api"
    });
});
 app.use('/api/role', roleRouter);
 app.use('/api/login', loginRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("nodejs app running...");
});