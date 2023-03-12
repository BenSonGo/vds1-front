import React, {useState} from 'react';
import {api, baseUrl} from "../../../api";
import classes from "../Report.module.css";
import {IconButton} from '@chakra-ui/react';
import {ChevronDownIcon, CloseIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {AddUnit} from "../AddUnit";
import clsx from "clsx";
import AddIndicatorValuePopup from "../AddIndicatorValue";
import {Companies, Unit} from "../types";

export const Hierarchy = ({companies}: {companies : Companies}) => {
    const [subunits, setSubunits] = useState<Array<Unit>>([]);
    const [indicators, setIndicators] = useState<Array<Unit>>([]);
    const [subUnitsVisible, setSubUnitsVisible] = useState(false);
    const [indicatorsVisible, setIndicatorsVisible] = useState(false);
    const [currentCompanyId, setCurrentCompanyId] = useState(0);
    const [currentIndicatorId, setCurrentIndicatorId] = useState<number>();
    const [indicatorPopupInfoOpen, setIndicatorPupopInfoOpen] = useState(false);

    const deleteCompanyHandler = (id: number) => api.delete(`${baseUrl}company/${id}`)
    const deleteIndicatorHandler = (id: number) => api.delete(`${baseUrl}indicator/${id}`)
    const deleteSubunitHandler = (id: number) => api.delete(`${baseUrl}company/subunit/${id}`,{data: {company_id: currentCompanyId,}})

    const lookMoreSubunitsHandler = (id: number) => {
        setSubUnitsVisible(prevState => !prevState);
        setCurrentCompanyId(id);

        api.get(`${baseUrl}company/subunit/tree`, {params: {company_id: id}}).then(function (response){setSubunits(response.data.data)
    })}

    const lookMoreIndicatorsHandler = () => {
        setIndicatorsVisible(prevState => !prevState);
        api.get(`${baseUrl}indicator`).then(function (response){setIndicators(response.data.data)
        })}

    const openIndicatorPopupHandler = (id: number) => {
        setIndicatorPupopInfoOpen(prevState => !prevState);
        setCurrentIndicatorId(id);
    }

    return (
        <div className={classes.hierarchyTree}>
            {companies.map((company) => (
                <div key={company.id} className={classes.unit}>
                    <h1 className={clsx(classes.unitName, company.id === currentCompanyId && subUnitsVisible && classes.activeUnit)}>{company.name}</h1>
                    <IconButton aria-label='Search database' onClick={() => lookMoreSubunitsHandler(company.id)} icon={<ChevronDownIcon className={clsx(company.id === currentCompanyId && subUnitsVisible && classes.pressedArrow)}/>} />
                    <IconButton aria-label='Search database' onClick={() => deleteCompanyHandler(company.id)} icon={<CloseIcon/>} />
                </div>
            ))}
            <AddUnit purpose={"company"}/>
            <hr/>
            {subunits.length > 0 && subUnitsVisible && subunits.map((subunit)=> (
                <div key={subunit.id} className={classes.unit}>
                    <h1 className={classes.unitName}>{subunit.name}</h1>
                    <IconButton aria-label='Search database' onClick={() => deleteSubunitHandler(subunit.id)} icon={<CloseIcon/>} />
                </div>
            ))
            }
            {subUnitsVisible && <div>
                <AddUnit purpose={"subunit"} company_id={currentCompanyId}/>
            </div>}
            <hr/>
            <div className={classes.unit}>
                <h1 className={classes.unitName}>All indicators</h1>
                <IconButton aria-label='Search database' onClick={() => lookMoreIndicatorsHandler()} icon={<ChevronDownIcon/>} />
            </div>
            {indicators.length > 0 && indicatorsVisible && indicators.map((indicator)=> (
                <div key={indicator.id} className={classes.unit}>
                    <h1 className={classes.unitName}>{indicator.name}</h1>
                    <IconButton aria-label='Search database' onClick={() => deleteIndicatorHandler(indicator.id)} icon={<CloseIcon/>} />
                    <IconButton aria-label='Search database' onClick={() => openIndicatorPopupHandler(indicator.id)} icon={<PlusSquareIcon/>} />
                </div>
            ))
            }
            {indicatorsVisible && <div>
                <AddUnit purpose={"indicator"}/>
            </div>}
            {indicatorPopupInfoOpen && <div className={classes.indicatorPopup}>
                    INDICATOR POPUP
                <hr/>
                {companies.map((company) => (
                    <div key={company.id} className={classes.unit}>
                        <div className={classes.unitName}>{company.name}</div>
                        <AddIndicatorValuePopup currentIndicatorId={currentIndicatorId} company_id={company.id}/>
                    </div>
                ))}
                <hr/>
                {subunits.length > 0 && subUnitsVisible && subunits.map((subunit)=> (
                    <div key={subunit.id} className={classes.unit}>
                        <div className={classes.unitName}>{subunit.name}</div>
                        <AddIndicatorValuePopup currentIndicatorId={currentIndicatorId} subunit_id={subunit.id}/>
                    </div>
                ))
                }
            </div>}
        </div>
    );
};
