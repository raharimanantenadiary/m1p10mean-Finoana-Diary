import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  message: any;
  formData = {
    code: '',

  };

  constructor(private toastr: ToastrService, private service: MasterService, private http: HttpClient, private router: Router) { }

  onSubmit() {
    console.log(this.formData);
    this.service.activation(this.formData).subscribe(response => {

      console.log(response);
      this.message = response;
      if (this.message.error == false) {
        this.showSuccess();
        localStorage.setItem('token', this.message.token);
        localStorage.setItem('id', this.message.id);
        this.router.navigate(['/t/acceuil']);

      }
    });
  }

  ngOnInit() {
  }

  showSuccess() {
    this.toastr.success('compte validé,bienvenue sur notre plateforme ');
  }

}