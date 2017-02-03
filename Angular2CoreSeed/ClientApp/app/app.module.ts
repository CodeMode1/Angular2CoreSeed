import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteComponent } from './components/delete/delete.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherDetailComponent } from './components/weatherdetail/weatherdetail.component';
import { FormsModule } from '@angular/forms';
import { WeatherFormComponent } from './components/weatherform/weatherform.component';
import { WeatherService } from './components/weather/weather.service';
import { WeatherConstraintsComponent } from './components/weatherconstraints/weatherconstraints.component';
import { WeatherConstraintsService } from './components/weatherconstraints/weatherconstraint.service';
import { WeatherConstraintComponent } from './components/weatherconstraints/weatherconstraint.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DatePipeLocal } from './components/weatherform/weatherform.pipe';
import { DialogModule } from '@progress/kendo-angular-dialog';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        DeleteComponent,
        WeatherComponent,
        WeatherDetailComponent,
        WeatherFormComponent,
        WeatherConstraintsComponent,
        WeatherConstraintComponent,
        DatePipeLocal
    ],
    providers: [
        WeatherService,
        WeatherConstraintsService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        DateInputsModule,
        DialogModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            {
                path: 'weathers', component: WeatherComponent, children: [
                    { path: '', component: WeatherDetailComponent },
                    { path: 'detail/:name', component: WeatherDetailComponent }
                ]
            },
            { path: 'weatherConstraints', component: WeatherConstraintsComponent },
            { path: 'weatherConstraints/:id', component: WeatherConstraintComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
