import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Button from 'react-bootstrap/Button'
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <form onSubmit={onSubmit}>
                아이디&nbsp;
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                /><br/>
                패스워드&nbsp;
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                /><br/><br/>
                <input
                    type="submit"
                    value={newAccount ? "계정 가입하기" : "로그인 하기"}
                />
                {error}&nbsp;
            <span onClick={toggleAccount}>
                {newAccount ? "로그인 하기" : "계정 가입하기"}
            </span>
            </form><br/>
            <div className="authBtns">
                <Button onClick={onSocialClick} name="google">
                    "Google"로 시작하기<FontAwesomeIcon icon={faGoogle} />
                </Button>&nbsp;
                <Button onClick={onSocialClick} name="github">
                    "Github"으로 시작하기<FontAwesomeIcon icon={faGithub} />
                </Button>
            </div>
        </div>
    );
};
export default Auth;