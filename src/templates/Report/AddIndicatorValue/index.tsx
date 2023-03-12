import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {Button, IconButton, Input} from "@chakra-ui/react";
import {api, baseUrl} from "../../../api";
import {CheckIcon} from "@chakra-ui/icons";

type Props = {
    currentIndicatorId: number | undefined,
    company_id?: number,
    subunit_id?: number,
}

const AddIndicatorValuePopup = ({currentIndicatorId, company_id, subunit_id}:Props) => {
    const {handleSubmit, control, formState: {errors}} = useForm({});

    const onSubmit = (data: any) => {
        if(company_id){
            api.post(`${baseUrl}indicator-value-by-month`, {
                indicator_id: currentIndicatorId,
                company_id: company_id,
                value: data.value,
                month: data.month,
            })
        }
        else{
            api.post(`${baseUrl}indicator-value-by-month`, {
                indicator_id: currentIndicatorId,
                subunit_id: subunit_id,
                value: Math.random(),
                month: "2023-10-01",
            })
        }

    }

    if (currentIndicatorId) return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name={"value"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 1, message: "Min length is 1"},
                }}
                render={({field}) => <Input {...field} placeholder={"Value"}/>}
            />
            {errors.name && <span>This field is required</span>}
            <Controller
                control={control}
                name={"month"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({field}) => <Input {...field} type="date" placeholder={"month"}/>}
            />
            {errors.name && <span>This field is required</span>}
                <IconButton aria-label='Search database' type="submit" icon={<CheckIcon/>} />
            <hr/>
        </form>
    );
    else return null;
};

export default AddIndicatorValuePopup;
