const express = require("express");
const app = express();

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const roleRouter = require('./routes/roleRouter');
const projectRouter = require('./routes/projectRouter');
const statusRouter = require('./routes/statusRouter');
const sprintRouter = require('./routes/sprintRouter');
const taskRouter = require('./routes/taskRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req , res) => {
    res.json({
        mensaje: "Api 3"
    });
});

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);
app.use('/api/project', projectRouter);
app.use('/api/status', statusRouter);
app.use('/api/sprint', sprintRouter);
app.use('/api/task', taskRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("nodejs api running...");
});