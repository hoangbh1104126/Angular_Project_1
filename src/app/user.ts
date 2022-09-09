export interface User{
  account_number : number;
  balance : number;
  firstname : string;
  lastname : string;
  age : number
  gender : string;
  address ?: string;
  employer ?: string;
  email ?: string;
  city ?: string;
  state ?: string;
  new ?: boolean;
}

export interface filterUser{
  account_number ?: number;
  balance ?: number;
  firstname ?: string;
  lastname ?: string;
  age ?: number
  gender ?: string;
  address ?: string;
  employer ?: string;
  email ?: string;
  city ?: string;
  state ?: string;
}
