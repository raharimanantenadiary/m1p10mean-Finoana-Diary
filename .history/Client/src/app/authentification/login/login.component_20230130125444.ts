import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: any;
  formData = {
    mail: '',
    mdp: ''
  };


  constructor(private toastr: ToastrService, private service: MasterService, private router: Router) { }

  onSubmit() {
    // console.log(this.formData);
    this.service.signin(this.formData).subscribe(response => {
      // this.message = response;
      // console.log(response)

      // console.log(response);
      this.message = response;
      if (this.message.error == false) {
        this.formData = {
          mail: '',
          mdp: ''
        };
        if (this.message.roleId == 1) {
          localStorage.setItem("id", this.message.id);
          localStorage.setItem("mail", this.message.mail);
          localStorage.setItem("nom", this.message.username);
          this.router.navigate(['/t/acceuil']);
        }
        if (this.message.roleId == 2) {
          localStorage.setItem("id", this.message.id);
          localStorage.setItem("mail", this.message.mail);
          localStorage.setItem("nom", this.message.username);
          this.router.navigate(['/t/acm']);
        }
        if (this.message.roleId == 3) {
          localStorage.setItem("id", this.message.id);
          localStorage.setItem("mail", this.message.mail);
          localStorage.setItem("nom", this.message.username);
          this.router.navigate(['/t/acf']);
        }

        // this.showSuccess();
      }
    });
  }

  ngOnInit() {
  }

  // showSuccess() {
  //   this.toastr.success('Effectuée avec success!', 'Ajout!');
  // }

}