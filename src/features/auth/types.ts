export interface AuthUser {
    email: string;
    password: string;
}

export interface RegisterUser extends AuthUser {
    first_name: string;
    last_name: string;
    username: string;
}
