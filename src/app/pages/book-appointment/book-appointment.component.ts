import { Component } from '@angular/core';
import { Visit } from '../../models/Visit';
import { Patient } from '../../models/Patient';
import { VisitService } from '../../services/visit.service';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent {
  visitsList!: Visit[]
  patient!: Patient
  username?:string
  success?:boolean = false

  constructor(private visitService: VisitService, private tokenStorageService: TokenStorageService) { }


  ngOnInit() {
    this.getVisits();
    this.username = this.tokenStorageService.getUsername()
  }
  public getVisits(): void {
    this.visitService.getAllvisits().subscribe(
      visitsList => {
        this.visitsList = visitsList.filter(visit => {
          return visit.dc_p_list?.length === 1;
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

  public onUpdateVisit(visit: Visit): void {
    const updates: Partial<Visit> = {
      dc_p_list: [
        { username: visit.dc_p_list?.at(0)?.username },
        { username: this.tokenStorageService.getUsername() }
      ]
    };
    this.visitService.updatePartOfvisit(visit.id!, updates).subscribe(
      updatedVisit => {
        console.log('Visit updated:', updatedVisit);
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

}
