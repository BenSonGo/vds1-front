import React from 'react';
import classes from "./Report.module.css";
import {Company} from "./Company";
import Companies from "./Company/Companies";

const Report = () => {

    return (
        <section className={classes.section}>
            <aside className={classes.aside}>
                <div className={classes.prompt}>Hierarchy below</div>
                <Company/>
                <Companies/>
            </aside>
            <main className={classes.main}>
                <div className={classes.prompt}>Sub unit info and other info below</div>
            </main>
        </section>
    );
};

export default Report;
