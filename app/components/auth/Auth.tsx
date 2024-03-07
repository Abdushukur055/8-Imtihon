"use client"
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SignIn } from '../../api/api-service/auth.service';
import { useRouter } from 'next/navigation';

const Auth = () => {
    const router = useRouter()
    const handleAuth = async (formData:FormData)=>{
        let username = formData.get("username")
        let password = formData.get("password")
        let payload = {username, password}
        const response = await SignIn({...payload})
        if (response?.data?.token) {
            if(response?.data.role === "admin"){
                router.push("/components/users")
            } else if (response?.data.role === "employee") {
                router.push("/components/user")
            }
        }
        console.log(response);
        
    }   
    return (
        <div>
            <Box>
                <div className="flex flex-col mt-[150px] items-center">
                  <div className="w-[350px] p-[30px] rounded-xl bg-white h-[380px]">
                  <h1 className='text-[40px] text-center mb-[50px]'>Auth</h1>
                    <form action={handleAuth} className='flex flex-col gap-[20px]'>
                        <TextField id="outlined-basic" name='username' label="Username" variant="outlined"/>
                        <TextField id="outlined-basic" name='password' label="Password" variant="outlined"/>
                       <button className='p-[10px] bg-[#151c2c] text-white rounded-sm'>Login</button>
                    </form>
                  </div>
                </div>
            </Box>
        </div>
    )
}

export default Auth