import React from 'react';
import {useForm, Controller} from "react-hook-form";
import {Button, Input} from "@chakra-ui/react";
import axios from "axios";
import {AUTH_TOKEN} from "../../const";

export const Company = () => {

    let api = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
        }
    })

    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            name: ''
        }
    });
    const onSubmit = (data: any) => api.post('http://localhost/api/company/', {
        name: data.name,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name={"name"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({field}) => <Input {...field} placeholder={"Company name"}/>}
            />
            {errors.name && <span>This field is required</span>}
            <Button type="submit">Save</Button>

        </form>
    );
};
