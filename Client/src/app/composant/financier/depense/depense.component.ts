import { Component, OnInit } from '@angular/core';

import { SfincancierService } from './../../../service/sfincancier.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {

  formDataType = {type:''};
  formDataDepense = {idtype:'',montant: ''};
  liste_type: any;

  constructor(private service:SfincancierService){}
  
  ngOnInit(): void {
      this.getListeType();
  }
  
  ajouterType(){
     this.service.ajoutTypeDepense({"intitule": this.formDataType.type}).subscribe(response => {
      this.liste_type = response;
      this.getListeType();
});
  }
  
  ajouterDepense(){
    alert(JSON.stringify(this.formDataDepense));
       this.service.ajoutDepense({"idtype": this.formDataDepense.idtype, "montant": this.formDataDepense.montant}).subscribe(response => {
        this.liste_type = response;
        this.getListeType();
  });
  }

  getListeType(){
    return  this.service.getAllTypeDepense().subscribe(response => {
        this.liste_type = response;
        console.log("type",this.liste_type);
  });
  }


}
