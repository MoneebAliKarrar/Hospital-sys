import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VisitService } from '../../services/visit.service';
import { Visit } from '../../models/Visit';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  visitsList?:Visit[]
  constructor(private visitService:VisitService) { }


  ngOnInit() {
    this.getVisits();
  }

  public getVisits(): void {
    this.visitService.getAllvisits().subscribe(
      visitsList => this.visitsList = visitsList
    );
  }

  appointments: any[] = [];

}
