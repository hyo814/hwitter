import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">메인 페이지</Link>
            </li>
            <li>
                <Link to="/profile">내 프로필</Link>
            </li>
        </ul>
    </nav>
);
export default Navigation;