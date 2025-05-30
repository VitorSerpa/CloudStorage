const express = require("express")
const multer = require("multer")
const path = require("path")
const router = express.Router()
const mediaController = require("../controller/mediaControllers")

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/")
    },
    filename : (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

router.post("/upload", upload.single("media"), mediaController.uploadMedia)