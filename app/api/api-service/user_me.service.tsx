import { $api } from "../interceptors";
import { IUserMe } from "../types/user.types";

export const getUserMe = async () => {
  try {
    const response = await $api.get("/users/me");
    return response
  } catch (error) {
    console.log(error);
  }
}

export const UpDate  = async (payload:IUserMe)=>{
  try{
    const response:any = await $api.patch("users/me",payload)
    return response
    
  }catch(error){
    console.error(error);
  }
} 