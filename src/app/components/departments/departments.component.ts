import { Component } from '@angular/core';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "../../../assets/resorces/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "../../../assets/resorces/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "../../../assets/resorces/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "../../../assets/resorces/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "../../../assets/resorces/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "../../../assets/resorces/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "../../../assets/resorces/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "../../../assets/resorces/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "../../../assets/resorces/departments/ent.jpg",
    },
  ];

  responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

}
