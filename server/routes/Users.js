const express = require('express');
const bcrypt = require('bcrypt')
const { sign } = require("jsonwebtoken")
const { Users } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware');

const router = express.Router();


//sequelize must be asynchronous , wait for data to be inserted before moving forward or checking errors

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
    try {
        await Users.create({ username: username, password: hashedPass })
        res.json("Success")
    } catch (e) {
        res.status(400).json(e.errors[0].message)
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } })

    if (!user) return res.json({ error: "User Doesn't exist" })

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res.json({ error: "Wrong Username and Password Combination" })

        const accessToken = sign({ username: user.username, id: user.id }, process.env.JWT_KEY)

        res.json({ token: accessToken, username: user.username, id: user.id })
    })
})

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router;