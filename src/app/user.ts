export interface User{
  account_number : number;
  balance : number;
  firstname : string;
  lastname : string;
  age : number
  gender : string;
  address : string;
  employer : string;
  email : string;
  city : string;
  state : string;
}

export interface filterUser{
  account_number ?: number;
  balance ?: number;
  name ?: string;
  age ?: number
  gender ?: string;
  address ?: string;
  employer ?: string;
  email ?: string;
  city ?: string;
  state ?: string;
}
