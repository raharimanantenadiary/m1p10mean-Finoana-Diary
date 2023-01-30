import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SfincancierService } from './../../../service/sfincancier.service';

@Component({
  selector: 'app-listepaiement',
  templateUrl: './listepaiement.component.html',
  styleUrls: ['./listepaiement.component.scss']
})
export class ListepaiementComponent implements OnInit {

  constructor(private service: SfincancierService, private toastr: ToastrService){}

  liste_non_valide: any;

  ngOnInit(): void {
      this.getListeNonValide();
  }

  getListeNonValide(){
    return  this.service.listeFactureNonValide().subscribe(response => {
        this.liste_non_valide = response;
        console.log('non valide', this.liste_non_valide);
    });
  }

  // validerFacture
  validerFacture(idfacture:any){
    alert(idfacture);
    // this.service.validerFacture({
    //   "idfacture": idfacture
    // }).subscribe(response => {
    //   this.getListeNonValide();
    //   this.showSuccess();
    // });
  }
        showSuccess() {
        this.toastr.success('Effectuée avec success!','Paiement!');
    }

}
