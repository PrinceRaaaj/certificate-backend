var express = require("express");
const { addCertificate, getOneCertificate, getAllCertificates } = require("../controllers/certificate");
var router = express.Router();

router.get("/all", getAllCertificates);
router.get("/:id", getOneCertificate);
router.post("/add", addCertificate);

module.exports = router