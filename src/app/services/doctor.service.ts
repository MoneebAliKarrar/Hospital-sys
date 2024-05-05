import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorsLink = "http://localhost:8080/doctors"
   
  constructor(private http:HttpClient) {}

  public getAllDoctors(): Observable<Doctor[]>{
  return this.http.get<Doctor[]>(this.doctorsLink);
  }

  public getSpecificDoctor(id:number): Observable<Doctor>{
    return this.http.get<Doctor>(this.doctorsLink +`/${id}`).pipe(
      tap(_ => this.log(`fetched Doctor id=${id}`)),
      catchError(this.handleError<Doctor>(`getDoctor id=${id}`))
    );
  }

  public addDoctor(newdoctor:Doctor):Observable<Doctor>{
    return this.http.post<Doctor>(this.doctorsLink,newdoctor, httpOptions).pipe(
      tap((addedDoctor:Doctor) => this.log(`added doctor id = ${addedDoctor.id}`)),
      catchError(this.handleError<Doctor>(`add doctor`))
      );
  }

  public deleteAllDoctors():Observable<Doctor>{
    return this.http.delete<Doctor>(this.doctorsLink, httpOptions).pipe(
      tap(_ => this.log(`deleted doctors`)),
      catchError(this.handleError<Doctor>(`deleted doctors`))
    );
  }

  public deleteDoctor(id:number):Observable<void>{
    return this.http.delete<void>(this.doctorsLink + `/${id}`, httpOptions);
  }

  public updateDoctorsSet(newdoctors:Doctor[]):Observable<Doctor[]>{
   return this.http.put<Doctor[]>(this.doctorsLink,newdoctors, httpOptions).pipe(
      tap(_ => this.log(`updated doctors`)),
      catchError(this.handleError<Doctor[]>(`updaging donctors`))
    );
  }

  public updateSpecificDoctor(newdoctor:Doctor):Observable<Doctor>{
    return this.http.put<Doctor>(this.doctorsLink + `${newdoctor.id}`,newdoctor, httpOptions).pipe(
      tap(_ => this.log(`updated doctor id = ${newdoctor.id}`)),
      catchError(this.handleError<Doctor>(`updating doctor id = ${newdoctor.id}`))
    );
  }

  public updatePartOfDoctor(id:number,updates:Partial<Doctor>):Observable<any>{
    return this.http.patch(this.doctorsLink,updates, httpOptions).pipe(
      catchError(this.handleError<any>(`update part of doctor`))
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
    console.log('DoctorService: ' + message);
  }

}
