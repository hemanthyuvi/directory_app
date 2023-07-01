export interface RegisterModel {
    userName:string;
    email:string;
    mobileNo: number;
    password: string;
    confirmPassword: string;
}

export interface loginModel{
    userName: string;
    pasword: string;
}

export interface resetModel{
    userName: string;
    password: string;
    confirmPassword: string;
}

export class contactModel{
    userId: string;
    contactName: string;
    workType: string;
    phoneNo: number;
    email: string;
    location: string
}
