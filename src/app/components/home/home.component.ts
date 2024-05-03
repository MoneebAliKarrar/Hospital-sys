import { Component } from '@angular/core';
import { Doctor } from '../../models/Doctor';
import { DoctorService } from '../../services/doctor.service';
import { Patient } from '../../models/Patient';
import { Prescription } from '../../models/Prescription';
import { Visit } from '../../models/Visit';
import { PatientService } from '../../services/patient.service';
import { PrescriptionService } from '../../services/prescription.service';
import { VisitService } from '../../services/visit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  doctorsList?: Doctor[]
  patientsList?: Patient[]
  prescriptionsList?: Prescription[]
  visitsList?: Visit[]


  constructor(private doctrosService: DoctorService, private patinetService: PatientService, private prescriptionService: PrescriptionService, private visitService: VisitService) { }

  ngOnInit() {
    this.getDoctors();
    this.getPatinets();
    this.getPrescriptions();
    this.getVisits();
  }

  public getDoctors(): void {
    this.doctrosService.getAllDoctors().subscribe(
      doctorsList => this.doctorsList = doctorsList
    );
  }

  public getPatinets(): void {
    this.patinetService.getAllPatients().subscribe(
      patientsList => this.patientsList = patientsList
    );
  }


  public getPrescriptions(): void {
    this.prescriptionService.getAllprescriptions().subscribe(
      prescriptionsList => this.prescriptionsList = prescriptionsList
    );
  }


  public getVisits(): void {
    this.visitService.getAllvisits().subscribe(
      visitsList => this.visitsList = visitsList
    );
  }


}
