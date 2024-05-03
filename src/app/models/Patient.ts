import { Doctor } from "./Doctor"
import { Prescription } from "./Prescription"
import { Visit } from "./Visit"

export class Patient{
    id:number
    firstname:string
    lastname:string
    visits:Visit[]
    prescriptions:Prescription[]
    doctors:Doctor[]

    constructor(id:number, firsname:string,lastname:string,visits:Visit[],prescriptions:Prescription[],doctors:Doctor[]){
        this.id = id;
        this.firstname = firsname;
        this.lastname = lastname;
        this.visits = visits;
        this.prescriptions = prescriptions;
        this.doctors = doctors;
    }

}