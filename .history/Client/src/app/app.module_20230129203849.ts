import { TestGuard } from './../../.history/src/app/guard/test.guard_20230129000126';
import { ClientGuard } from './../../.history/src/app/guard/client.guard_20230128235051';
import { ModifieravancementComponent } from './composant/mecanicien/modifieravancement/modifieravancement.component';
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
import { ValidationComponent } from './authentification/validation/validation.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { AcceuilComponent } from './composant/client/acceuil/acceuil.component';
import { TemplateComponent } from './composant/template/template.component';
import { HeaderComponent } from './composant/header/header.component';
import { NavbarComponent } from './composant/navbar/navbar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarComponent } from './composant/sidebar/sidebar.component';
import { HistoriqueComponent } from './composant/client/historique/historique.component';
import { HomedefaultComponent } from './composant/homedefault/homedefault.component';
import { DetailfactureComponent } from './composant/client/detailfacture/detailfacture.component';
import { AvancementComponent } from './composant/client/avancement/avancement.component';
import { AcceuilmecanicienComponent } from './composant/mecanicien/acceuilmecanicien/acceuilmecanicien.component';
import { AcceuilfinancierComponent } from './composant/financier/acceuilfinancier/acceuilfinancier.component';
import { ListepaiementComponent } from './composant/financier/listepaiement/listepaiement.component';
import { SearchPipe } from './SearchPipe';
import { DetailavancementComponent } from './composant/mecanicien/detailavancement/detailavancement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BonsortieComponent } from './composant/mecanicien/bonsortie/bonsortie.component';
import { MoyenneComponent } from './composant/financier/moyenne/moyenne.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DepenseComponent } from './composant/financier/depense/depense.component';
import { DeconnexionComponent } from './authentification/deconnexion/deconnexion.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchPipe,
    InscriptionComponent,
    AcceuilComponent,
    ValidationComponent,
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
    AcceuilfinancierComponent,
    ListepaiementComponent,
    DetailavancementComponent,
    ModifieravancementComponent,
    BonsortieComponent,
    MoyenneComponent,
    DepenseComponent,
    DeconnexionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent},
      { path: 'inscription', component: InscriptionComponent },
      { path: 'validation', component: ValidationComponent },
      {
        path: 't', component: TemplateComponent, children: [
          { path: '', component: HomedefaultComponent , canActivate: [TestGuard] },
          { path: 'acceuil', component: AcceuilComponent    },
          { path: 'historique/:idvoiture', component: HistoriqueComponent },
          { path: 'detailfacture/:idvoiture', component: DetailfactureComponent },
          { path: 'avancement/:idvoiture', component: AvancementComponent },
          { path: 'acm', component: AcceuilmecanicienComponent },
          { path: 'acm/:idvoiture/:idreparation', component: DetailavancementComponent },
          { path: 'bdetail/:idvoiture/:idreparation', component: BonsortieComponent },
          { path: 'modif/:idvoiture/:idrep/:iddiag/:partie/:montant/:av/:det', component: ModifieravancementComponent },
          { path: 'acf', component: AcceuilfinancierComponent },
          { path: 'acf/:mois', component: AcceuilfinancierComponent },
          { path: 'lp', component: ListepaiementComponent },
          { path: 'moyenne', component: MoyenneComponent },
          { path: 'depense', component: DepenseComponent },
        ]
      },

    ])
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
