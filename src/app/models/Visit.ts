import { User } from "./User"

export class Visit{
    id?:number
    date:Date
    dc_p_list?:User[]
    constructor(id:number,date:Date){
        this.id = id
        this.date = date
    }
}