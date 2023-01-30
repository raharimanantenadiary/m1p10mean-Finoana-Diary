import { SgarageService } from '../../../service/sgarage.service';
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-modifieravancement',
  templateUrl: './modifieravancement.component.html',
  styleUrls: ['./modifieravancement.component.scss']
})
export class ModifieravancementComponent   implements OnInit {

    constructor(private route_actuel: ActivatedRoute, private service: SgarageService, private router: Router, private toastr: ToastrService){}

    id_voiture: any;
    id_rep: any;
    id_diag: any;
    partie: any;
    montant: any;
    avancement: any;
    details: any;
    
    OnSubmit(){
      alert(JSON.stringify(this.formData));
    }
    
    ngOnInit(){
        this.id_voiture = this.route_actuel.snapshot.paramMap.get('idvoiture');
        this.id_rep = this.route_actuel.snapshot.paramMap.get('idrep');
        this.id_diag = this.route_actuel.snapshot.paramMap.get('iddiag');
        this.partie = this.route_actuel.snapshot.paramMap.get('partie');
        this.montant = this.route_actuel.snapshot.paramMap.get('montant');
        this.avancement = this.route_actuel.snapshot.paramMap.get('av');
        this.details = this.route_actuel.snapshot.paramMap.get('det');
        console.log('rep',this.id_rep);
        console.log('diag',this.id_diag);
        // this.modifier();
    }
   
    formData = {
      partie: '',
      montant: '',
      detail: '',
      avancement: '' 
    };


    modifier(){
      let vrai_avancement = 0;
      let nouveau_avancement= this.avancement + Number(this.formData.avancement);
      
      if(nouveau_avancement < 100  ){
        vrai_avancement = nouveau_avancement ;
      }else if(nouveau_avancement > 100){
        vrai_avancement = 100 ;
      }
      alert(nouveau_avancement);
      // this.service.updateDiag(
      //   {
      //     "idreparation": this.id_rep,
      //     "iddiag": this.id_diag,
      //     "avancement": vrai_avancement 
      //   }
      //   ).subscribe(response => {
      //     this.showSuccess();
      //       this.router.navigate(['/t/acm/',this.id_voiture,this.id_rep]);
      //   });
    }


      showSuccess() {
        this.toastr.success('Effectuée avec success!','Modification de l\'avancement la voiture!');
    }



}
