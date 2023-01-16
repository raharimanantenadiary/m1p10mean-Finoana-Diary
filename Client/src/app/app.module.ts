import { FooterComponent } from './composant/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { AcceuilComponent } from './composant/client/acceuil/acceuil.component';
import { TemplateComponent } from './composant/template/template.component';
import { HeaderComponent } from './composant/header/header.component';
import { NavbarComponent } from './composant/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    AcceuilComponent,
    TemplateComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'inscription', component: InscriptionComponent },
      { path: 'template', component: TemplateComponent },
      { path: 'acceuil', component: AcceuilComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'footer', component: FooterComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
