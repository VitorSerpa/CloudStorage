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

