import React from "react";
import { FC } from "react";
import styles from "./Header.module.css"

const Header: FC = () =>{
    return(
        <header className={styles.header}>
            <h1>Importação de arquivos</h1>
        </header>
    )
}

export default Header