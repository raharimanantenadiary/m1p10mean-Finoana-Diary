import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private service:SfincancierService, private toastr: ToastrService){}
  
  ngOnInit(): void {
      this.getListeType();
  }
  
  ajouterType(){
    if(!this.formDataType.type){
        this.showErreurType();
        return;
    }else{
      this.service.ajoutTypeDepense({"intitule": this.formDataType.type}).subscribe(response => {
       this.liste_type = response;
       this.getListeType();
       this.showSuccess();
        this.formDataType = {type:''};
      });
    }
  }

    showSuccess() {
        this.toastr.success('Effectuée avec success!','Ajout!');
    }
  
    showErreurType() {
        this.toastr.warning('Erreur!','completer le champ!');
    }
  
  
    showErreurDepense() {
        this.toastr.warning('Erreur!','completer le champ!');
    }
  
  ajouterDepense(){
    alert(JSON.stringify(this.formDataDepense));
    if(!this.formDataDepense.idtype && !this.formDataDepense.montant){
        this.showErreurDepense();
      return;
    }else{
      this.service.ajoutDepense({"idtype": this.formDataDepense.idtype, "montant": this.formDataDepense.montant}).subscribe(response => {
       this.liste_type = response;
       this.getListeType();
       this.showSuccess();
        this.formDataDepense = {idtype:'',montant: ''};
 });
    }
  }

  getListeType(){
    return  this.service.getAllTypeDepense().subscribe(response => {
        this.liste_type = response;
        console.log("type",this.liste_type);
  });
  }


}
