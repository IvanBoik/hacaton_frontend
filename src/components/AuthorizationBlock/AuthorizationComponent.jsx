import React from "react";
import styles from "./AuthorizationComponent.module.scss";
import { NavLink } from "react-router-dom";
import AuthController from "../../api/AuthController";

const AuthorizationComponent = () => {

    const login = async () => {
        const email = document.querySelector(".AutorizationEmail").value;
        const password = document.querySelector(".AutorizationPassword").value;
        const data = await AuthController.login(
            {
                username: email,
                password: password
            }
        );

        console.log(data);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
    };
    //const AutorizationEmail = document.querySelector(".AutorizationEmail").value;
    //const AutorizationPassword = document.querySelector(".AutorizationPassword").value;
    //if (AutorizationPassword === "fsdfds") throw new Error();

    return(
        <div className={styles.Form}>
            <input type="text" placeholder="E-mail" className="AutorizationEmail"/>
            <input type="text" placeholder="Пароль" className="AutorizationPassword"/>
            <NavLink onClick={login}>Войти</NavLink>
        </div>
    )
}

export default AuthorizationComponent;