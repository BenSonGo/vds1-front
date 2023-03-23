import React from 'react';
import {useForm, Controller} from "react-hook-form";
import {Button, Input} from "@chakra-ui/react";
import {api, baseUrl} from "../../../api";

type AddUnitType = {
    purpose: "company" | "subunit" | "indicator",
    company_id?: number,
}

const urls = {
    company: `${baseUrl}company`,
    subunit: `${baseUrl}company/subunit`,
    indicator: `${baseUrl}indicator`,
}

export const AddUnit = ({purpose, company_id}:AddUnitType) => {
    const url = urls[purpose];
    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            name: ''
        }
    });

    const onSubmit = (data: any) => {
        if(company_id){
            api.post(url, {
                name: data.name,
                company_id: company_id,
                resource_id: 1,
            })
                .then(function (response) {
                    console.log(response.data.data.name);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            api.post(url, {
                name: data.name,
            })
                .then(function (response) {
                    // console.log(response.data.data.name);
                })
                .catch(function (error) {
                    // console.log(error);
                });
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name={"name"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({field}) => <Input {...field} placeholder={`${purpose} name`}/>}
            />
            {errors.name && <span>This field is required</span>}
            <Button type="submit">Add</Button>
        </form>
    );
};
