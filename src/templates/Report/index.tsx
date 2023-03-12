import React, {useEffect, useState} from 'react';
import classes from "./Report.module.css";
import {Export} from "./Export";
import {api, baseUrl} from "../../api";
import {Companies} from "./types";
import {Hierarchy} from "./Hierarchy";


const Report = () => {
    const [companies, setCompanies] = useState<Companies>([]);

    useEffect(() => {
        api.get(`${baseUrl}company`).then(function (response) {setCompanies(response.data.data)})
    }, [setCompanies])

    return (
        <section className={classes.section}>
            <aside className={classes.aside}>
                <div className={classes.prompt}>Hierarchy below</div>
                <Hierarchy companies={companies}/>
            </aside>
            <main className={classes.main}>
                <div className={classes.prompt}>Export info below</div>
                <Export companies={companies}/>
            </main>
        </section>
    );
};

export default Report;
