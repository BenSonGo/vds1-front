import React from 'react';
import classes from "./Report.module.css";
import {Company} from "../../components/Company";

const Report = () => {
    return (
        <>

        <section className={classes.section}>

            <aside className={classes.aside}>
                <Company/>
            </aside>
            <main className={classes.main}>
                Enter info
            </main>
        </section>
        </>
    );
};

export default Report;
