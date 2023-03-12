import React from 'react';
import classes from "./Home.module.css";
import Header from "../../components/Header";
import {Register} from "../Register";
import Report from "../Report";
import {Route, Routes} from "react-router-dom";
import {Auth} from "../Auth";
const Home = () => {

    return (
        <div className={classes.home}>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/auth"} element={<Auth/>}/>
                    <Route path={"/report"} element={<Report/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default Home;
