export interface User{
    id?: string;
    username: string;
    password: string;
    userType: Role;
    email: string;
    mobileNumber?: number;
    confirmed: boolean;
    token?: string;
}

export enum Role {
    Admin = 'ADMIN',
    User = 'USER'
    
}