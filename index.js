const express = require("express");
const app = express();

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const roleRouter = require('./routes/roleRouter');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api", (req , res) => {
    res.json({
        mensaje: "Api 3"
    });
});

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("nodejs api running...");
});