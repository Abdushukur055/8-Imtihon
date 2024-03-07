export interface IUser {
  first_name: FormDataEntryValue | null;
  last_name: FormDataEntryValue | null;
  avatar: string;
  age: number;
  role: FormDataEntryValue | null | string;
  image?: string | undefined;
  username:FormDataEntryValue | null
  description:FormDataEntryValue | null
  password:FormDataEntryValue | null,
  _id?: string | undefined
}


export interface Page  {
  q:string,
  page:number
}


export interface IUserMe {
  age?:number,
  avatar?:string,
  description?: any,
  first_name?:string,
  last_name?:string,
  password?:string,
  read_guides?:number,
  role?:string,
  todo_guides?:number,
  total_guides?:number,
  username?:number,
  _id?:string
}