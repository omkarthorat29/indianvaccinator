import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDataComponent } from './common/user-data/user-data.component';
import { ProfileComponent } from './common/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ContactUsService } from './services/contact-us.service';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { FooterComponent } from './common/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserDataComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ContactUsComponent,
    FeedbackComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService,UserService,ContactUsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
