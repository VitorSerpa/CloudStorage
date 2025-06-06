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

router.get("/getMedias/:pesquisa", (req, res) => {
    const palavraPesquisa = req.params.pesquisa
    let jsonFiles = {arquivos: []}
    fs.readdir(uploadDir, (err, files) =>{
        files.forEach((element) => {
            if(element.startsWith(palavraPesquisa))
                jsonFiles["arquivos"].push(element)
        })
        if(err)
            return res.status(500).send("Erro ao listar arquivos")
        
        if (files.length < 1){
            return res.json({arquivos:"Nenhum arquivo encontrado"})
        }
        return res.status(200).json(jsonFiles)
    })

});

router.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath); 
    } else {
        res.status(404).send("Arquivo não encontrado");
    }
});

router.get("/getMedias", (req, res) => {
    fs.readdir(uploadDir, (err, files) =>{
        if(err){
            return res.status(500).send("Erro ao listar arquivos")
        }
        if(files.length < 1)
            return res.json({arquivos:"Nenhum arquivo encontrado"})
        return res.json({arquivos:files})
    })
});

router.delete("/deleteMedia", (req, res) => {

})

module.exports = router;
