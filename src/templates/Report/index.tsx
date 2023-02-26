import React from 'react';
import classes from "./Report.module.css";
import Units from "./Units";

const Report = () => {

    return (
        <section className={classes.section}>
            <aside className={classes.aside}>
                <div className={classes.prompt}>Hierarchy below</div>
                <Units/>
            </aside>
            <main className={classes.main}>
                <div className={classes.prompt}>Sub unit info and other info below</div>
            </main>
        </section>
    );
};

export default Report;
