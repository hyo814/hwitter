import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <div className="container">
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로 그 아 웃
        </span>        
      </div>
    );
};