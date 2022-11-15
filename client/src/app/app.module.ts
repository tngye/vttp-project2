import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { AttractionsComponent } from './components/attractions.component';
import { HomeComponent } from './components/home.component';
import { AccomodationsComponent } from './components/accomodations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './components/events.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogOverviewExampleDialog, UsersComponent } from './components/users.component';
import { LoginComponent } from './components/login.component';
import { AttractionDetsComponent } from './components/attraction-dets.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { FavouritesComponent } from './components/favourites.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'accomodations', component: AccomodationsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'user', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'attractiondets/:type', component: AttractionDetsComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AttractionsComponent,
    AccomodationsComponent,
    EventsComponent,
    UsersComponent, 
    LoginComponent,
    DialogOverviewExampleDialog, 
    AttractionDetsComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes , { useHash : true }),
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
   
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
