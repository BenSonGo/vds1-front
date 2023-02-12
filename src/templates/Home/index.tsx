import React from 'react';
import classes from "./Home.module.css";
import Header from "../../components/Header";
import {AuthReg} from "../AuthReg";
import Report from "../Report";
import {Route, Routes} from "react-router-dom";

const Home = () => {
    return (
        <div className={classes.home}>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/auth"} element={<AuthReg/>}/>
                    <Route path={"/report"} element={<Report/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default Home;
