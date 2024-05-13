import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component'
import { UserComponent } from './pages/user/user.component';
import { authGuard } from './guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { BiographyComponent } from './components/biography/biography.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { PrescriptionComponent } from './pages/prescription/prescription.component';
import { PrescriptionFormComponent } from './components/prescription-form/prescription-form.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'admin', component: UserComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: RegisterComponent },
  { path: 'appointment' , component: AppointmentComponent ,canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] }},
  { path: 'aboutus' , component: AboutusComponent},
  { path: 'add-prescription', component: PrescriptionComponent,canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] }},
  { path: 'bookappointment', component: BookAppointmentComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER'] } },
  { path: 'addedappointment', component: BookAppointmentComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent, RegisterComponent,
    UserComponent,
    HeaderComponent,
    HeroComponent,
    BiographyComponent,
    DepartmentsComponent,
    MessageFormComponent,
    AppointmentComponent,
    AppointmentFormComponent,
    AboutusComponent,
    PrescriptionComponent,
    PrescriptionFormComponent,
    BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
