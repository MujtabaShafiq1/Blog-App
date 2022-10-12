const express = require("express");
const cors = require("cors")

require("dotenv").config();

const db = require('./models')
const app = express();

app.use(express.json())
app.use(cors())

// Routers
const postRouter = require("./routes/Posts")
const commentsRouter = require("./routes/Comments")
const usersRouter = require("./routes/Users")
const likesRouter = require("./routes/Likes")

app.use("/posts",postRouter)
app.use("/comments",commentsRouter)
app.use("/auth",usersRouter)
app.use("/likes",likesRouter)


db.sequelize.sync().then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})

