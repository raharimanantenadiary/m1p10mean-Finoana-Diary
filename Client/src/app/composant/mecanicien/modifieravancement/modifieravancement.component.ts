import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-modifieravancement',
  templateUrl: './modifieravancement.component.html',
  styleUrls: ['./modifieravancement.component.scss']
})
export class ModifieravancementComponent   implements OnInit {

    constructor(){}

    ngOnInit(){
    }

    formData = {
      partie: '',
      montant: '',
      detail: '',
      avancement: '0' //0 % par défaut
    };

    OnSubmit(){
        alert(JSON.stringify(this.formData));
    }

}
