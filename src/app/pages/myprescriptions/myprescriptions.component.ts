import { Component } from '@angular/core';
import { Prescription } from '../../models/Prescription';
import { PrescriptionService } from '../../services/prescription.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-myprescriptions',
  templateUrl: './myprescriptions.component.html',
  styleUrl: './myprescriptions.component.css'
})
export class MyprescriptionsComponent {
  prescriptionsList!: Prescription[]

  constructor(private prescriptionService: PrescriptionService, private tokenStorageService: TokenStorageService, public userService: UserService) { }
  ngOnInit() {
    this.getPrescriptions();
  }

  public getPrescriptions(): void {
    this.prescriptionService.getAllprescriptions().subscribe(
      prescriptionsList => {
        this.prescriptionsList = prescriptionsList.filter(prescription => {
          return prescription.dc_p_list?.some(user => user.username === this.tokenStorageService.getUsername());
        });
      }
    );
  }

  public searchBasedOnDoctors(key: string): void {
    const results: Prescription[] = [];
    for (const prescription of this.prescriptionsList) {
      if (prescription.dc_p_list?.at(0)?.username?.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(prescription);
      }
    }
    this.prescriptionsList = results;
    if (results.length === 0 || !key) {
      this.getPrescriptions();
    }
  }
}
