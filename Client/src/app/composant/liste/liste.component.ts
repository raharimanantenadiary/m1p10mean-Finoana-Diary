import { Component } from '@angular/core';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {
 
  titre = "Liste hotel"
 hotels = [
  {id: 1, nom: 'Hôtel de la plage', description: 'Un hôtel magnifique avec vue sur la mer', image: 'hotel1.jpg'},
  {id: 2, nom: 'Hôtel montagne', description: 'Un hôtel luxueux dans les montagnes', image: 'hotel2.jpg'},
  {id: 3, nom: 'Hôtel de ville', description: 'Un hôtel historique en plein cœur de la ville', image: 'hotel3.jpg'},
];
}
