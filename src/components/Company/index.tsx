import React from 'react';
import {useForm, Controller} from "react-hook-form";
import {Button, Input} from "@chakra-ui/react";

export const Company = () => {
    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            email: ''
        }
    });
    const onSubmit = (data: any) => console.log(data.email);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name={"email"}
                rules={{
                    required: "It is a required field",
                    minLength: {value: 2, message: "Min length is 2"},
                }}
                render={({ field }) => <Input {...field} placeholder={"Company name"}/>}
            />
            {errors.email && <span>This field is required</span>}
            <Button type="submit">Save</Button>

        </form>
    );
};
