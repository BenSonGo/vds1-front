import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <Link to={"/auth"}>
                <Button>Auth</Button>
            </Link>
            <Link to={"/report"}>
                <Button>Report Table</Button>
            </Link>
        </header>
    );
};

export default Header;
