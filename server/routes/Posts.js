const express = require('express');
const router = express.Router();

const { Posts, Likes } = require("../models")
const { validateToken } = require('../middlewares/AuthMiddleware');

//sequelize must be asynchronous , wait for data to be inserted before moving forward or checking errors

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    res.json(listOfPosts)
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post)
})


router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    await Posts.create(post)
    res.json(post)
})

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId
        }
    })
    res.json("Post Deleted")
})

module.exports = router;