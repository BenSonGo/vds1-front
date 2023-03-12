import React from 'react';
import {api, baseUrl} from "../../../api";
import {Button} from "@chakra-ui/react";
import {Companies} from "../types";
import classes from "../Report.module.css";

export const exportData = async (id:number) => {
    try {
        const response = await api.get(`${baseUrl}indicator-value-by-month/export`, {
            responseType: 'blob',
            params: {company_id: id},
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const handleExportClick = async (id:number) => {
    const data = await exportData(id);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = 'filename.csv';
    link.click();
};

export const Export = ({companies}:{companies: Companies}) => {
    return (
        <div className={classes.exportBlock}>
            Download report including indicators-by-month (simply click "Export")
            {companies.map((company)=> (
                <div key={company.id} className={classes.unit}>
                    <h1 className={classes.unitName}>{company.name}</h1>
                    <Button colorScheme="whatsapp" onClick={() => handleExportClick(company.id)}>Export</Button>
                </div>
            ))}
        </div>
    );
};
