export class RegisterForm {

    username: string;
    email: string;
    displayName: string;
    password: string;

    constructor(username: string, email: string, displayName: string, password: string) {
        this.username = username;
        this.email = email;
        this.displayName = displayName;
        this.password = password;
    }
}
