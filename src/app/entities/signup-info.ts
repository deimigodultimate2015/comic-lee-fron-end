export class SignupInfo {
    name: string;
    username: string;
    email: string;
    role: string[];
    password: string;

    constructor(name: string, username: string, role: string[], password: string) {
        this.name = name;
        this.username = username;
        this.role = role;
        this.password = password;
    }
}
