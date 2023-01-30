import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  message: any;
  formData = {
    username: '',
    mail: '',
    mdp: ''
  };
  loading:any;

  constructor(private toastr: ToastrService, private service: MasterService, private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.loading = true;
    this.service.signup(this.formData).subscribe(response => {
      console.log(response);
      this.message = response;
      this.loading = false;
      if (this.message.error == false) {
        this.router.navigate(['/validation']);
      }
    });
  }

  ngOnInit() {
  }

  showSuccess() {
    this.toastr.success('Effectuée avec success!', 'Inscription!');
  }

}