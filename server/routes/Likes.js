const express = require('express');
const router = express.Router();

const { Likes } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")

router.get("/", validateToken, async(req,res) => {
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id} });
    res.json(likedPosts);
})

router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({
        where:
            { PostId: PostId, UserId: UserId }
    })

    if (!found) {
        await Likes.create({ PostId: PostId, UserId: UserId })
        res.json({liked: true})
    } else {
        await Likes.destroy({
            where:
                { PostId: PostId, UserId: UserId }
        })
        res.json({liked: false})
    }
})

module.exports = router;