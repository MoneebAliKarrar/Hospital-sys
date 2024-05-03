import { Doctor } from "./Doctor"
import { Patient } from "./Patient"

export class Prescription{
    id:number
    medicine:string
    dose:string
    instruction:string
    doctor:Doctor
    patient:Patient

    constructor(id:number,medicine:string,dose:string,instruction:string,doctor:Doctor,patient:Patient){
        this.id = id
        this.medicine = medicine
        this.dose = dose
        this.instruction = instruction
        this.doctor = doctor
        this.patient = patient
    }

}