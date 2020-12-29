import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
    <nav>
        <ul>
            <li>
                <Link to="/">메인 페이지</Link>
            </li>
            <li>
                <Link to="/profile">{userObj.displayName}의 내 Profile</Link>
            </li>
        </ul>
    </nav>
);
export default Navigation;