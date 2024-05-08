export class User{
    id?:number
    username?:string
    password?:string

    constructor(username:string){
        this.username = username;
    }
}