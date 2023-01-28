import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SgarageService } from '../../../service/sgarage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bonsortie',
  templateUrl: './bonsortie.component.html',
  styleUrls: ['./bonsortie.component.scss']
})
export class BonsortieComponent implements OnInit {

  
  information_depot: any;
  information_user: any;
  liste_diagnostic: any;
  bon_sortie: any;

  

  info_reparation: any = [];
  id_reparation: string | null = '';
  id_voiture: string | null = '';

  
  constructor(private toastr: ToastrService,private garage_service: SgarageService,private route: ActivatedRoute){}
  


  ngOnInit(){
    this.id_reparation = this.route.snapshot.paramMap.get("idreparation"); 
    this.id_voiture = this.route.snapshot.paramMap.get("idvoiture"); 
    this.getDepotEncours();
  }
  
    getDepotEncours(){
      return  this.garage_service.reparationPourBondeSortie(this.id_reparation,this.id_voiture).subscribe(response => {
          console.log(response);
          this.info_reparation = response;
          this.information_depot = this.info_reparation[0].depot;
          this.liste_diagnostic = this.info_reparation[0].diagnostic;
          this.information_user = this.info_reparation[0].user[0];
          this.bon_sortie = this.info_reparation[0].bonsortie;
        });
    }
    
    validerBonSortie(){
      return  this.garage_service.validationBondeSortie(this.bon_sortie._id).subscribe(response => {
        this.getDepotEncours();
          console.log(response);
      });
    }

  

}
