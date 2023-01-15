import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListeComponent } from './composant/liste/liste.component';
import { DetailComponent } from './composant/detail/detail.component';
import { AcceuilComponent } from './composant/acceuil/acceuil.component';
import { LoginComponent } from './composant/login/login.component';
import { FooterComponent } from './composant/footer/footer.component';
import { TemplateComponent } from './composant/template/template.component';
import { AndranaComponent } from './andrana/andrana.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmployeComponent } from './employe/employe/employe.component';
import { EmployerComponent } from './composant/employer/employer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeComponent,
    DetailComponent,
    AcceuilComponent,
    LoginComponent,
    FooterComponent,
    TemplateComponent,
    AndranaComponent,
    HeaderComponent,
    HomeComponent,
    EmployeComponent,
    EmployerComponent
  ],
  imports: [
    BrowserModule,
  RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'liste', component: ListeComponent },
    { path: 'acceuil', component: AcceuilComponent },
    { path: 'emp', component: EmployerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'andrana', component: AndranaComponent },
    { path: 'template', component: TemplateComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: '**', redirectTo: 'acceuil'  }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
