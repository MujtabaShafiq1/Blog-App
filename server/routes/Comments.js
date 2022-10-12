const express = require("express")
const { validateToken } = require("../middlewares/AuthMiddleware")
const router = express.Router();

const { Comments } = require("../models")

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments)
})

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username
    comment.username = username
    const newComment = await Comments.create(comment);
    res.json(newComment)
})

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({
        where: {
            id: commentId
        }
    })
    res.json("Comment Deleted")
})

module.exports = router;