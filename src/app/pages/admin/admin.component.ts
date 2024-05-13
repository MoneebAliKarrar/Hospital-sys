import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/Doctor';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Prescription } from '../../models/Prescription';
import { PrescriptionService } from '../../services/prescription.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  prescriptionsList?: Prescription[]
  constructor(private prescriptionService: PrescriptionService) { }


  ngOnInit() {
    this.getVisits();
  }

  public getVisits(): void {
    this.prescriptionService.getAllprescriptions().subscribe(
      prescriptionsList => this.prescriptionsList = prescriptionsList
    );
  }
  appointments: any[] = [];
}
