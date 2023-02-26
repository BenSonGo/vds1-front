import React, {useEffect, useState} from 'react';
import {api, baseUrl} from "../../api";
import classes from "./Report.module.css";
import {IconButton} from '@chakra-ui/react';
import {ChevronDownIcon, CloseIcon} from "@chakra-ui/icons";
import {AddUnit} from "./AddUnit";
import clsx from "clsx";

export type Company = {
    id: number,
    name: number,
    created_at: string,
}

export type Unit = {
    id: number,
    name: number,
    created_at: string,
}

const Units = () => {
    const [companies, setCompanies] = useState<Array<Company>>([]);
    const [subunits, setSubunits] = useState<Array<Unit>>([]);
    const [subUnitsVisible, setSubUnitsVisible] = useState(false);
    const [currentCompanyId, setCurrentCompanyId] = useState(0);

    useEffect(() => {
        api.get(`${baseUrl}company`).then(function (response) {
            setCompanies(response.data.data)
        })
    }, [setCompanies])

    const deleteCompanyHandler = (id: number) => api.delete(`${baseUrl}company/${id}`)

    const deleteSubunitHandler = (id: number) => api.delete(`${baseUrl}company/subunit/${id}`,{data: {
        company_id: currentCompanyId,
        }})

    const lookMoreHandler = (id: number) => {
        setSubUnitsVisible(prevState => !prevState);
        setCurrentCompanyId(id);

        api.get(`${baseUrl}company/subunit`, {params: {company_id: id}}).then(function (response){
        setSubunits(response.data.data)
    })}

    return (
        <div className={classes.companiesList}>
            {companies.map((company) => (
                <div key={company.id} className={classes.company}>
                    <h1 className={clsx(classes.companyName, company.id === currentCompanyId && subUnitsVisible && classes.activeUnit)}>{company.name}</h1>
                    <IconButton aria-label='Search database' onClick={() => lookMoreHandler(company.id)} icon={<ChevronDownIcon className={clsx(company.id === currentCompanyId && subUnitsVisible && classes.pressedArrow)}/>} />
                    <IconButton aria-label='Search database' onClick={() => deleteCompanyHandler(company.id)} icon={<CloseIcon/>} />
                </div>
            ))}
            <AddUnit purpose={"company"}/>
            <hr/>
            {subunits.length > 0 && subUnitsVisible && subunits.map((subunit)=> (
                <div key={subunit.id} className={classes.company}>
                    <h1 className={classes.companyName}>{subunit.name}</h1>
                    {/*<IconButton aria-label='Search database' onClick={() => deleteHandler(subunit.id)} icon={<ChevronDownIcon/>} />*/}
                    <IconButton aria-label='Search database' onClick={() => deleteSubunitHandler(subunit.id)} icon={<CloseIcon/>} />
                </div>
            ))
            }
            {subUnitsVisible && <div>
                <AddUnit purpose={"subunit"} company_id={currentCompanyId}/>
            </div>}
        </div>
    );
};

export default Units;
