import { Doctor } from "./Doctor"
import { Prescription } from "./Prescription"
import { User } from "./User"
import { Visit } from "./Visit"

export class Patient{
    id?:number
    firstname:string
    lastname?:string
    visits?:Visit[]
    prescriptions?:Prescription[]
    doctors?:Doctor[]
    user?:User

    constructor(firsname:string,lastname:string,user:User){
        this.firstname = firsname;
        this.lastname = lastname;
        this.user = user
    }

}