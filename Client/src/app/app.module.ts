import { FooterComponent } from './composant/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { AcceuilComponent } from './composant/client/acceuil/acceuil.component';
import { TemplateComponent } from './composant/template/template.component';
import { HeaderComponent } from './composant/header/header.component';
import { NavbarComponent } from './composant/navbar/navbar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarComponent } from './composant/sidebar/sidebar.component';
import { HistoriqueComponent } from './composant/client/historique/historique.component';
import { HomedefaultComponent } from './composant/homedefault/homedefault.component';
import { DetailfactureComponent } from './composant/client/detailfacture/detailfacture.component';
import { AvancementComponent } from './composant/client/avancement/avancement.component';
import { AcceuilmecanicienComponent } from './composant/mecanicien/acceuilmecanicien/acceuilmecanicien.component';
import { AcceuilfinancierComponent } from './composant/financier/acceuilfinancier/acceuilfinancier.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    AcceuilComponent,
    TemplateComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HistoriqueComponent,
    HomedefaultComponent,
    DetailfactureComponent,
    AvancementComponent,
    AcceuilmecanicienComponent,
    AcceuilfinancierComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'inscription', component: InscriptionComponent },
      { path: 't', component: TemplateComponent , children:[
        { path: '', component: HomedefaultComponent },
        { path: 'acceuil', component: AcceuilComponent },
        { path: 'historique', component: HistoriqueComponent },
        { path: 'detailfacture', component: DetailfactureComponent },
        { path: 'avancement', component: AvancementComponent },
        { path: 'acm', component: AcceuilmecanicienComponent },
        { path: 'acf', component: AcceuilfinancierComponent },
      ]},
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
