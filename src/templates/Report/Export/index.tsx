import React, {useEffect, useState} from 'react';
import {api, baseUrl} from "../../../api";
import {Button} from "@chakra-ui/react";
import {Companies, Unit} from "../types";
import classes from "../Report.module.css";

export const exportData = async (id:number, subunit_id?: number) => {
    try {
        const response = await api.get(`${baseUrl}indicator-value-by-month/export`, {
            responseType: 'blob',
            params: {company_id: id, company_subunit_id: subunit_id},
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const handleExportClick = async (id:number, subunit_id?: number) => {
    const data = await exportData(id, subunit_id);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = 'filename.csv';
    link.click();
};

export const Export = ({companies}:{companies: Companies}) => {
    const [subunits, setSubunits] = useState<Array<Unit>>();

    useEffect(()=>{
        api.get(`${baseUrl}company/subunit/tree`, {params: {company_id: 25}}).then(function (response){
            {setSubunits(response.data.data)}
        })
    },[])

    return (
        <div className={classes.exportBlock}>
            Download report including indicators-by-month (simply click "Export")
            {companies.map((company)=> (
                <div key={company.id} className={classes.unit}>
                    <h1 className={classes.unitName}>{company.name}</h1>
                    <Button colorScheme="whatsapp" onClick={() => handleExportClick(company.id)}>Export</Button>
                </div>
            ))}
            {subunits && subunits.map((subunit)=> (
                <div key={subunit.name} className={classes.unit}>
                    <h1 className={classes.unitName}>{subunit.name}</h1>
                    <Button colorScheme="whatsapp" onClick={() => handleExportClick(25, subunit.id)}>Export</Button>
                </div>
            ))}

        </div>
    );
};
