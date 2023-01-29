import { SgarageService } from '../../../service/sgarage.service';
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-modifieravancement',
  templateUrl: './modifieravancement.component.html',
  styleUrls: ['./modifieravancement.component.scss']
})
export class ModifieravancementComponent   implements OnInit {

    constructor(private route_actuel: ActivatedRoute, private service: SgarageService, private router: Router){}

    
    
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
      this.service.updateDiag(
        {
          "idreparation": this.id_rep,
          "iddiag": this.id_diag,
          "avancement": this.formData.avancement 
        }
        ).subscribe(response => {
            this.router.navigate(['/t/acm/',this.id_voiture,this.id_rep]);
        });
    }




}
