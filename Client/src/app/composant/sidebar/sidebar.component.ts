import { Component } from '@angular/core';
import { Client } from '../../Client';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    user : Client = new Client(1,'Valimbavaka','mecanicien',true);

}
