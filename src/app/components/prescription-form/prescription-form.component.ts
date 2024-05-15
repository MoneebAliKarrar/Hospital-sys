import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctor';
import { Prescription } from '../../models/Prescription';
import { Patient } from '../../models/Patient';
import { PrescriptionService } from '../../services/prescription.service';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.css'
})
export class PrescriptionFormComponent {
  form: any = {};
  username?: string
  patient?: Patient
  success?:Boolean = false

  constructor(private tokenStorageService: TokenStorageService, private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUsername();
  }

  handlePrescription(): void {
    const newPrescription: Prescription = {
      medicine: this.form.medicine,
      dose: this.form.dose,
      instruction: this.form.instruction,
      dc_p_list: [{
        username: this.tokenStorageService.getUsername()
      }, {
        username: this.form.username
      }]
    };

    this.prescriptionService.addprescription(newPrescription).subscribe(
      addedVisit => {
        console.log('New prescription added successfully:', addedVisit);
        this.resetForm();
        this.success = true
        setTimeout(() => {
          this.success = false; // Reset success state
        }, 2000);
      },
      error => {
        console.error('Error adding new prescription:', error);
      }
    );
  }

  resetForm(): void {
    this.form.username = '';
    this.form.medicine = '';
    this.form.dose = '';
    this.form.instruction = '';
  }

}
