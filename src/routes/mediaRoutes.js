const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs")
const router = express.Router();
const mediaController = require("../controller/mediaControllers");

const uploadDir = path.join(__dirname, "..", "..", "upload");

if(!fs.existsSync(uploadDir)){
    fs.mkdir(uploadDir)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("media"), mediaController.uploadMedia);


router.get("/upload/:nomeArquivo", (req, res) => {
}, mediaController.getMedia);

router.get("/upload", (req, res) => {
    fs.readdir(uploadDir, (err, files) =>{
        if(err){
            return res.status(500).send("Erro ao listar arquivos")
        }
        res.json(files)
    })
});


module.exports = router;
