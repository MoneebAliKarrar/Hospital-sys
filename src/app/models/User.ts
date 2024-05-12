import { Prescription } from "./Prescription";
import { Visit } from "./Visit";

export class User{
    id?:number
    username?:string
    password?:string
    visits?:Visit[]
    prescriptions?:Prescription[]

    constructor(username:string){
        this.username = username;
    }
}