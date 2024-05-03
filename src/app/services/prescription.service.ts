import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription } from '../models/Prescription';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private prescriptionsLink = "http://localhost:8080/prescriptions"

  constructor(private http: HttpClient) { }

  public getAllprescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.prescriptionsLink);
  }

  public getSpecificPatinet(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(this.prescriptionsLink + `/${id}`).pipe(
      tap(_ => this.log(`fetched Patinet id=${id}`)),
      catchError(this.handleError<Prescription>(`getDoctor id=${id}`))
    );
  }

  public addprescription(newprescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.prescriptionsLink, newprescription, httpOptions).pipe(
      tap((addedprescription: Prescription) => this.log(`added prescription id = ${addedprescription.id}`)),
      catchError(this.handleError<Prescription>(`add prescription`))
    );
  }

  public deleteAllprescriptions(): Observable<Prescription> {
    return this.http.delete<Prescription>(this.prescriptionsLink, httpOptions).pipe(
      tap(_ => this.log(`deleted prescriptions`)),
      catchError(this.handleError<Prescription>(`deleted Patinets`))
    );
  }

  public deleteprescription(id: number): Observable<Prescription> {
    return this.http.delete<Prescription>(this.prescriptionsLink + `/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted student id = ${id}`)),
      catchError(this.handleError<Prescription>(`deleted Student id = ${id}`))
    );
  }

  public updateprescriptionsSet(newprescriptions: Prescription[]): Observable<Prescription[]> {
    return this.http.put<Prescription[]>(this.prescriptionsLink, newprescriptions, httpOptions).pipe(
      tap(_ => this.log(`updated prescriptions`)),
      catchError(this.handleError<Prescription[]>(`updaging prescriptions`))
    );
  }

  public updateSpecificprescription(newprescription: Prescription, id: number): Observable<Prescription> {
    return this.http.put<Prescription>(this.prescriptionsLink + `${id}`, newprescription, httpOptions).pipe(
      tap(_ => this.log(`updated prescription id = ${id}`)),
      catchError(this.handleError<Prescription>(`updating prescription id = ${id}`))
    );
  }

  public updatePartOfprescription(id: number, updates: Partial<Prescription>): Observable<any> {
    return this.http.patch(this.prescriptionsLink, updates, httpOptions).pipe(
      catchError(this.handleError<any>(`update part of prescription`))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log('StudentService: ' + message);
  }
}
