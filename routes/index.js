const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).send("Welcome to the Certificate Api Backend.")
})

module.exports = router