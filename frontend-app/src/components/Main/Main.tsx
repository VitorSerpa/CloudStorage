import React, { FC, useState, useEffect } from "react";
import styles from "./Main.module.css";

const Main: FC = () => {
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [arquivosDisponiveis, setarquivosDisponiveis] = useState<string[] | null>([]);

    const handleFormSubmit = (e: React.FormEvent) => {
        if (arquivo) {
            const form = new FormData();
            form.append("media", arquivo);

            fetch("http://localhost:5000/media/upload", {
                method: "POST",
                body: form,
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) setArquivo(e.target.files[0]);
    };

    const fetchArquivos = () => {
        fetch("http://localhost:5000/media/getMedias")
            .then((res) => res.json())
            .then((data) => setarquivosDisponiveis(data.arquivos))
            .catch((err) => console.error(err));
    };

    const fetchArquivosOnChange = (valor: string) => {
        fetch("http://localhost:5000/media/getMedias/" + valor)
            .then((res) => res.json())
            .then((data) => setarquivosDisponiveis(data.arquivos))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchArquivos();
    }, []);

    return (
        <div className={styles.mainDiv}>
            <div className={styles.mainContainer}>
                <form onSubmit={handleFormSubmit}>
                    <input onChange={handleInputChange} type="file" /> <br />
                    <br />
                    <button type="submit">Enviar</button>
                </form>

                <div>
                    <input
                        type="text"
                        onChange={(e) => {
                            fetchArquivosOnChange(e.target.value);
                        }}
                        placeholder="Pesquisar..."
                    />
                    <ul>
                        {arquivosDisponiveis &&
                            arquivosDisponiveis.length > 0 &&
                            arquivosDisponiveis.map((file, index) => (
                                <li key={index}>
                                    <a href={`http://localhost:5000/media/download/${file}`} download>
                                        {file}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;
