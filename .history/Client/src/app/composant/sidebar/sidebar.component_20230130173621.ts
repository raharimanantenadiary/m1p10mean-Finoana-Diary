import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user_actif: any;

  constructor(private toastr: ToastrService, private service: MasterService, private router: Router) { }

  ngOnInit(): void {
      // this.user_actif = this.service.getInfo(this.getItem('id')).subscribe(=>)
      this.getInfo();
  }

  getInfo() {
    return this.service.getUserInfo(localStorage.getItem("id")).subscribe(response => {
      this.user_actif = response;
      // console.log("user",this.user_actif);
    });
  }

}

