import { Doctor } from "./Doctor"
import { Patient } from "./Patient"

export class Visit{
    id:number
    date:Date
    doctor:Doctor
    patient:Patient
    constructor(id:number,date:Date,doctor:Doctor,patient:Patient){
        this.id = id
        this.date = date
        this.doctor = doctor
        this.patient = patient
    }
}