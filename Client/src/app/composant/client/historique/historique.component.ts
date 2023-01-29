import { Component, OnInit } from '@angular/core';
import { SgarageService } from './../../../service/sgarage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent  implements OnInit{


   detail: any;
  diag: any;
  id_voiture: any;
  constructor(private service: SgarageService,private router:ActivatedRoute) { }


    ngOnInit(): void {  
        this.id_voiture = this.router.snapshot.paramMap.get('idvoiture');
        this.getDetail();
    }


    getDetail(){
      return  this.service.voirHistorique(this.id_voiture).subscribe(response => {
        this.detail = response;
        console.log("voiture 1", this.detail);
      });
    }

}
