import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VisitService } from '../../services/visit.service';
import { Visit } from '../../models/Visit';
import { Patient } from '../../models/Patient';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Prescription } from '../../models/Prescription';
import { PrescriptionService } from '../../services/prescription.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  visitsList!: Visit[]
  patient!: Patient
  username?:string
  success?:boolean = false

  constructor(private visitService: VisitService, private tokenStorageService: TokenStorageService, public userService: UserService) { }


  ngOnInit() {
    this.getVisits();
    this.username = this.tokenStorageService.getUsername()
  }
  public getVisits(): void {
    this.visitService.getAllvisits().subscribe(
      visitsList => {
        this.visitsList = visitsList.filter(visit => {
          return visit.dc_p_list?.length === 2 && visit.dc_p_list?.some(user => user.username === this.tokenStorageService.getUsername());
        });
      }
    );
  }

  public searchBasedOnDoctors(key: string): void {
    const results: Visit[] = [];
    for (const visit of this.visitsList) {
      if (visit.dc_p_list?.at(0)?.username?.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(visit);
      }
    }
    this.visitsList = results;
    if (results.length === 0 || !key) {
      this.getVisits();
    }
  }

  public sortVisitsByDate(): void {
    this.visitsList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }

  public onDeleteVisit(visit: Visit): void {
    const updates: Partial<Visit> = {
      dc_p_list: [
        { username: visit.dc_p_list?.at(0)?.username },
      ]
    };
    this.visitService.updatePartOfvisit(visit.id!, updates).subscribe(
      updatedVisit => {
        console.log('Visit deleted:', updatedVisit);
        this.success = true
        setTimeout(() => {
          this.success = false
          window.location.reload(); // Reload the page
        },2000);
        
      },
      error => {
        console.error('Error updating visit:', error);
      }
    );
    this.getVisits();
  }

  appointments: any[] = [];

}
