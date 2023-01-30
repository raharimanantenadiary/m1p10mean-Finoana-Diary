import { SfincancierService } from './../../../service/sfincancier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-detailfacture',
  templateUrl: './detailfacture.component.html',
  styleUrls: ['./detailfacture.component.scss']
})
export class DetailfactureComponent implements OnInit {


  constructor(private route_actuel: ActivatedRoute, private route: Router,private facture_service: SfincancierService){}

  progress = 0;
  id_voiture: any;
  detail_facture: any;
  liste_diag: any;

  ngOnInit(): void {
      this.id_voiture = this.route_actuel.snapshot.paramMap.get("idvoiture"); 
      this.getDetailFacture();
  }

  getDetailFacture(){
    return  this.facture_service.facturebyvoiture(this.id_voiture).subscribe(response => {
      this.detail_facture = response;
      this.liste_diag = this.detail_facture[0].diagnostic;
      console.log("reponse",response);
    });
  }

}
