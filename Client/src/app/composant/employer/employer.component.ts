import { Component } from '@angular/core';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent {

  liste_employer: any;
  // constructor(private liste_emp: EmployerService) {}

  // ngOnInit(): void {
  //   this.liste_employer.getListeEmp().subscribe((data) => {
  //     this.liste_employer = data;
  //   });
  // }
}
