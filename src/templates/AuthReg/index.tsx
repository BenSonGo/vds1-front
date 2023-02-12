import React from 'react';
import {useForm, Controller} from "react-hook-form";
import classes from "./AuthReg.module.css";
import {Button, Input} from "@chakra-ui/react";
import axios from "axios";

export const AuthReg = () => {
    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            name: '',
            password: '',
        }
    });
    const onSubmit = (data: any) => axios.post('http://127.0.0.1:8080/api/register/', {
        email: data.email,
        name: data.name,
        password: data.password,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Controller
                control={control}
                name={"email"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({ field }) => <Input {...field} type={"email"} placeholder={"email"}/>}
            />
            {errors.email && <span>This field is required</span>}
            <Controller
                control={control}
                name={"name"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({ field }) => <Input {...field} placeholder={"name"}/>}
            />
            {errors.email && <span>This field is required</span>}
            <Controller
                control={control}
                name={"password"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({ field }) => <Input {...field} placeholder={"password"}/>}
            />
            {errors.email && <span>This field is required</span>}
            <Button type="submit">Reg/Auth</Button>

        </form>
    );
};