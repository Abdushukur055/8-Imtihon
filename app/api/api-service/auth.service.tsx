import { $apiAuth } from "../interceptors";
import { saveCookies } from "./Cookie/cookie";

export const SignIn = async (data:any)=>{
    try{
      const response =  await $apiAuth.post("/users/login",data)
      saveCookies(response?.data?.data?.token)
      return response?.data
    }catch(error){
        console.log(error);
    }
}