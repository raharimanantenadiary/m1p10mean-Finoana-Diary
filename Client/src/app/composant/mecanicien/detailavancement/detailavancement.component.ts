import { SgarageService } from '../../../service/sgarage.service';
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailavancement',
  templateUrl: './detailavancement.component.html',
  styleUrls: ['./detailavancement.component.scss']
})
export class DetailavancementComponent implements OnInit {

  formData = {
    partie: '',
    montant: '',
    detail: '',
    avancement: '0' //0 % par défaut
  };
  info_reparation: any;
  liste_diag: any;
  id_depot: string | null = '';
  total_reparation:any;
  constructor(private toastr: ToastrService,private garage_service: SgarageService,private route: ActivatedRoute){}
  
  OnSubmit() {
    this.garage_service.ajoutListeReparation({
      "id": this.info_reparation._id,
      "partie": this.formData.partie,
      "montant": this.formData.montant,
      "details": this.formData.detail
    }).subscribe(response => {
      this.showSuccess();
      this.getDepotEncours();
    });
  };
  

  ngOnInit(){
    this.id_depot = this.route.snapshot.paramMap.get("id"); 
    this.getDepotEncours();
  }

    getDepotEncours(){
      return  this.garage_service.detailDepot_dans_Reparation(this.id_depot).subscribe(response => {
          console.log(response);
          this.info_reparation = response;
      });
    }

    showSuccess() {
      this.toastr.success('Effectuée avec success!','Ajout de reparation pour la voiture!');
    }
} 
