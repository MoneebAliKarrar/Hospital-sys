import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VisitService } from '../../services/visit.service';
import { Visit } from '../../models/Visit';
import { Patient } from '../../models/Patient';
import { TokenStorageService } from '../../auth/token-storage.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  visitsList?:Visit[]
  patient!:Patient
  
  constructor(private visitService:VisitService,private tokenStorageService:TokenStorageService) { }


  ngOnInit() {
    this.getVisits();
  }
  public getVisits(): void {
    this.visitService.getAllvisits().subscribe(
      visitsList => {
          this.visitsList = visitsList.filter(visit => {
            return visit.dc_p_list?.some(user => user.username === this.tokenStorageService.getUsername());
          });
      }
    );
  }
  

  appointments: any[] = [];

}
