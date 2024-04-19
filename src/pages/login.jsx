import React from 'react';
import { Card, Button, Container, TextInput, Title, PasswordInput, Grid} from '@mantine/core';
import { useForm } from '@mantine/form';
import axiosInstance  from '../axios.js'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const Login = React.memo(() => {
    const navigate = useNavigate();
    const form = useForm({
        validate: {
            email: (value) =>
              /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value) ? null : 'Please enter a valid email address',
          },
      }); 
    const makeLogin = async (values) => {
        let navigateToLogin = false

        try {
            let loginUrl = "token/"
            const response = await axiosInstance.post(loginUrl,{...values})
            if(response?.status === 200){
                navigateToLogin = true
                localStorage.setItem('access', response?.data?.access);
                localStorage.setItem('refresh', response?.data?.refresh);
                localStorage.setItem('isUserLoggedIn', true)
            }
          }
        catch(err) {
            toast.error(err?.response?.data?.detail, {style: {background: "#242424", color: "#fff"}})
            }
        finally {
            if(navigateToLogin){
                window.location.href = "/";
            }

        }
    }
    return (
    <div className='w-full login-container'> 
    <Card shadow="sm" padding="xl" radius="md" withBorder className='mt-12 w-2/6 mx-auto'>
    <Title order={2} mx="auto" mb={4}>Login</Title>
      <form onSubmit={form.onSubmit((values) => makeLogin(values))}>
      <Grid gutter="md">
        <Grid.Col span={12}>
            <TextInput
            label="Email"
            placeholder="Enter your Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.target.value)}
            {...form.getInputProps('email')}
            required
            />
        </Grid.Col>
        <Grid.Col span={12}>
            <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.target.value)}
            {...form.getInputProps('password')}
            required
            />
        </Grid.Col>     
        <Grid.Col span={12}>
        <Button className='primary-background-color' fullWidth mt="md" radius="md" type='submit'>
        Login
      </Button>
      </Grid.Col>
      </Grid>
      </form>
    </Card>
        
    

    </div>
    )
})