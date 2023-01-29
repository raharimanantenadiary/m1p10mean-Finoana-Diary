import { Component , OnInit} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent implements OnInit {


  constructor(private router: Router){}

    ngOnInit(): void {
        localStorage.removeItem('id');
        localStorage.removeItem('mail');
        this.router.navigate(['/login']);
    }

}
