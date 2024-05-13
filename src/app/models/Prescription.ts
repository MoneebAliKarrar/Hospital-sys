import { Doctor } from "./Doctor"
import { Patient } from "./Patient"
import { User } from "./User"

export class Prescription {
    id?: number
    medicine: string
    dose: string
    instruction: string
    dc_p_list?: User[]

    constructor(id: number, medicine: string, dose: string, instruction: string) {
        this.id = id
        this.medicine = medicine
        this.dose = dose
        this.instruction = instruction
    }

}