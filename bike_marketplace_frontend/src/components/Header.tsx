import React from "react";

import userPng from "../images/user.png";
import { post } from "./backendInterface";

function Header() {
    const [isProfileDropdown, setIsProfileDropdown] = React.useState(false);

    function toggleProfileDropdown() {
        setIsProfileDropdown((prevIsProfileDropdown) => {
            return !prevIsProfileDropdown;
        })
    }

    function logout() {
        let formData = new FormData();
        formData.append("is_logout", "true");
        const requestResponse = post("/api/auth/", formData);
        requestResponse.then(() => {
            window.location.replace("/signin/");
        })
    }

    return (
        <>
            <div className="nav-header" style={{ background: "#CBC3E0"}}>
                <div className="primary brand-logo">
                    <a href="#" style={{ color: "#7571f9"}}>
                        <span className="brand-title">
                            <p>Aggie Bikes</p>
                        </span>
                    </a>
                </div>
            </div>
            <div className="header">
                <div className="header-content clearfix">

                    <div className="header-right">
                        <ul className="clearfix">
                            <li className="icons dropdown">
                                <div className="user-img c-pointer position-relative" data-toggle="dropdown" 
                                    onClick={toggleProfileDropdown}>
                                    <span className="activity active"></span>
                                    <img src={userPng} height="40" width="40" alt="" />
                                </div>
                                <div className={isProfileDropdown ? 'drop-down dropdown-profile dropdown-menu show' : 'drop-down dropdown-profile dropdown-menu' }>
                                    <div className="dropdown-content-body">
                                        <ul>
                                            <li><a href="#" onClick={logout}><i className="icon-key"></i> <span>Logout</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;