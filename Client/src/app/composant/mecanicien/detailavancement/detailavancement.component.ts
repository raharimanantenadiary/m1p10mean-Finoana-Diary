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
    duree: '',
    avancement: '' 
  };
  
  information_depot: any;
  information_user: any;
  liste_diagnostic: any;

  

  info_reparation: any = [];
  id_reparation: string | null = '';
  id_voiture: string | null = '';
  
  constructor(private toastr: ToastrService,private garage_service: SgarageService,private route: ActivatedRoute){}
  
  OnSubmit() {
    this.garage_service.ajoutListeReparation({
      "id": this.info_reparation[0]._id,
      "partie": this.formData.partie,
      "montant": this.formData.montant,
      "details": this.formData.detail,
      "duree": this.formData.duree
    }).subscribe(response => {
      this.showSuccess();
      this.getDepotEncours();
    });
  };


  ngOnInit(){
    this.id_reparation = this.route.snapshot.paramMap.get("idreparation"); 
    this.id_voiture = this.route.snapshot.paramMap.get("idvoiture"); 
    this.getDepotEncours();
  }

    getDepotEncours(){
      return  this.garage_service.listeReparationByVoitureReparation(this.id_reparation,this.id_voiture).subscribe(response => {
          console.log(response);
          this.info_reparation = response;
          this.information_depot = this.info_reparation[0].depot;
          this.liste_diagnostic = this.info_reparation[0].diagnostic;
          this.information_user = this.info_reparation[0].user[0];
          console.log('user',this.info_reparation[0].sumAvanc);
          // console.log('depot',this.information_depot.datedepot);
          // console.log('diagnostic',this.liste_diagnostic);
      });
    }

    showSuccess() {
      this.toastr.success('Effectuée avec success!','Ajout de reparation pour la voiture!');
    }
} 
