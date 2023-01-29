import { Component, OnInit } from '@angular/core';
import { SgarageService } from './../../../service/sgarage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avancement',
  templateUrl: './avancement.component.html',
  styleUrls: ['./avancement.component.scss']
})
export class AvancementComponent implements OnInit {


  detail_evancement: any;
  diag: any;
  id_voiture: any;
  constructor(private service: SgarageService,private router:ActivatedRoute) { }


    ngOnInit(): void {  
        this.id_voiture = this.router.snapshot.paramMap.get('idvoiture');
        this.getDetail();
    }


    getDetail(){
      return  this.service.voirAvancement(this.id_voiture).subscribe(response => {
        this.detail_evancement = response;
        // this.detail_evancement = this.detail_evancement;
        console.log("voiture 1", this.detail_evancement);
      });
    }

}
