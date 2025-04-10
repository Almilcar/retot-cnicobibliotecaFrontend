import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroPrestamoComponent } from './pages/registro-prestamo/registro-prestamo.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { RegistrClienteComponent } from './pages/registr-cliente/registr-cliente.component';
import { RegistoUsuarioComponent } from './pages/registo-usuario/registo-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from './pages/menu/menu.component'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
 


@NgModule({
  declarations: [
    AppComponent,
    RegistroPrestamoComponent,
    RegistrClienteComponent,
    RegistoUsuarioComponent,
    MenuComponent
  ],
  imports: [
    MatButtonToggleModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,        
    MatCardModule,         
    MatFormFieldModule,   
    MatInputModule,        
    MatButtonModule,        
    MatSelectModule ,        
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
     
    ],
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }


