import React, { FC, useState } from "react";

const Main: FC = () =>{
    const [arquivo, setArquivo] = useState<File | null>(null)

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        if(arquivo){
            const form = new FormData()
            form.append("media", arquivo)

            fetch("http://localhost:5000/media/upload", {
                method : "POST",
                body : form
            })
            .then(res => res.text())
            .then(data => console.log(data))
            .catch(err => console.error(err))
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files.length > 0)
            setArquivo(e.target.files[0])
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <input onChange={handleInputChange} type="file" name="" id="" /> <br /><br />
                <button type="submit" >Enviar</button>
            </form >
        </div>
    )
}

export default Main