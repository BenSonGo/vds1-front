import React, {useEffect, useState} from 'react';
import {api, baseUrl} from "../../../api";
import classes from "../Report.module.css";
import {IconButton} from '@chakra-ui/react';
import {CloseIcon} from "@chakra-ui/icons";

export type Company = {
    id: number,
    name: number,
    created_at: string,
}

const Companies = () => {
    const [companies, setCompanies] = useState<Array<Company>>([]);

    useEffect(() => {
        api.get(`${baseUrl}company`).then(function (response) {
            setCompanies(response.data.data)
        })
    }, [setCompanies])

    const deleteHandler = (id: number) => api.delete(`${baseUrl}company/${id}`)

    return (
        <div className={classes.companiesList}>
            {companies.map((company) => (
                <div key={company.id} className={classes.company}>
                    <h1 className={classes.companyName}>{company.name}</h1>
                    <IconButton aria-label='Search database' onClick={() => deleteHandler(company.id)} icon={<CloseIcon/>} />
                </div>
            ))}
        </div>
    );
};

export default Companies;
