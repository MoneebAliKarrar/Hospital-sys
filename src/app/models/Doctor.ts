import { Patient } from "./Patient"
import { Prescription } from "./Prescription"
import { Visit } from "./Visit"

export class Doctor {
    id?: number
    firstname?: string
    lastname?: string
    visits?: Visit[]
    prescriptions?: Prescription[]
    patients?: Patient[]
    image?: string
    department?: string
    email?: string
    phone?: string

    constructor(id: number, firsname: string, lastname: string, visits: Visit[], prescriptions: Prescription[], patients: Patient[]) {
        this.id = id;
        this.firstname = firsname;
        this.lastname = lastname;
        this.visits = visits;
        this.prescriptions = prescriptions;
        this.patients = patients;
    }


}