import { Time } from "@angular/common"
import { User } from "./User"

export class Visit {
    id?: number
    date: Date
    time: string
    dc_p_list?: User[]
    constructor(id: number, date: Date, time: string) {
        this.id = id
        this.date = date
        this.time = time
    }
}