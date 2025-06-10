const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs")
const router = express.Router();
const mediaController = require("../controller/mediaControllers");

const uploadDir = path.join(__dirname, "..", "..", "upload");

const storage = mediaController.createStorage()
const upload = multer({ storage: storage });



router.post("/upload", upload.single("media"), mediaController.uploadMedia);

router.get("/getMedias/:pesquisa", mediaController.searchFile);

router.get("/download/:filename", mediaController.downloadFile);

router.get("/getMedias", mediaController.getMedias);

router.delete("/deleteMedia/:filename", mediaController.deleteMedia)

module.exports = router;
