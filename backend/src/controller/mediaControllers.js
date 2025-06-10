const fs = require("fs")
const path = require("path");
const multer = require("multer");
const uploadDir = path.join(__dirname, "..", "..", "upload");


exports.createStorage = () =>{
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

    return storage
}


exports.uploadMedia = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Nenhum arquivo enviado" });
        }

        return res.status(200).json({
            message: "Arquivo enviado com sucesso!",
            file: req.file,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao enviar arquivo" });
    }
};

exports.searchFile = (req, res) => {
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

}

exports.downloadFile =  (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath); 
    } else {
        res.status(404).send("Arquivo não encontrado");
    }
}

exports.getMedias = (req, res) => {
    fs.readdir(uploadDir, (err, files) =>{
        if(err){
            return res.status(500).send("Erro ao listar arquivos")
        }
        if(files && files.length < 1)
            return res.json({arquivos:"Nenhum arquivo encontrado"})
        return res.json({arquivos:files})
    })
}

exports.deleteMedia = (req, res) => {
    const filename = req.params.filename

    fs.unlinkSync(uploadDir + "/" +filename, (err, file) => {
        if(err)
            return res.status(404).json({arquivos: "Erro ao excluir arquivo"})
        if(file.length < 1)
            return res.json({arquivos:"Nenhum arquivo encontrado"})
    })
    return res.status(200).json({arquivos:"Arquivo excluido com sucesso"})
}