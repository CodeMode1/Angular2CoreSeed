import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather, IWeather } from './weather';
import { WeatherFormComponent } from '../weatherform/weatherform.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { WeatherService } from './weather.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    selector: 'weather',
    template: require('./weather.component.html'),
    styles: [require('./weather.component.css')]
})
export class WeatherComponent implements OnInit {
    public inputDelete: boolean;
    public inputIdDelete: number;
    public weathers: Weather[];
    public weather1: Weather;
    public showForm: boolean;
    public titreWeather: string;
    public editForm: boolean;

    constructor(private _http: Http, private _route: ActivatedRoute,
        private _weatherService: WeatherService, private _router: Router) {
        this.editForm = false;
        this.inputDelete = false;
        this.inputIdDelete = null;
        this.titreWeather = "Weather Check";
        this.showForm = false;
        // class weather object to bind to.
        this.weather1 = new Weather(1, "HotWeather", new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        console.log(this.weather1.date);
    }

    ngOnInit(): void {

        // Method to get weather objects
        this.getAllWeathers();        
    }

    // GET : all weather objects from db
    getAllWeathers(){
        this._weatherService
            .getAllWeathersAPI()
            .subscribe(
                data => {
                    console.log("Get all weather objets : " + JSON.stringify(data));
                    this.weathers = data;
                },
                error => {
                    console.log("Erreur du serveur :  " + error);
                }
            );
    }

    showWeatherForm() {
        this.showForm = !this.showForm;
        this.editForm = false;
        console.log(this.showForm);
    }

    goDelete(idToDelete: number) {
        this.inputDelete = true;
        console.log("in go delete : " + idToDelete);
        this.inputIdDelete = idToDelete;
    }

    // refresh the results after the child component has emitted the deletion was successfull.
    refreshResults($event) {
        if ($event == true) {
            // delete the weather client side :
            this.weathers.splice(this.inputIdDelete, 1);
            this.getAllWeathers();
            this.inputDelete = false;
        } else {
            console.log($event);
            this.inputDelete = false;
        } 
    }

    // take a js object  (usually object or array) convert it to JSON string notation
    // to get JSON object use parse method
    get diagnostic(): string {
        return JSON.stringify(this.weather1);
    }

    // Get the payload weather object from children component weatherform
    postWeather($event){
        this.weather1 = $event;
        console.log("new weather to post : ");
        console.log(this.weather1);

        // Method to save new weather object
        this.saveWeather(this.weather1);
    }

    // edit a weather
    editWeather($event) {
        this.weather1 = $event;
        console.log("editing a weather : ");
        console.log(this.weather1);

        // method to edit a weather
        this.putWeather(this.weather1);
    }

    // edit a weather when clicking a link on weather objects table.
    goEdit(weather: Weather) {
        this.weather1 = weather;
        this.showForm = true;
        this.editForm = true;
    }

    // POST : call the post action on backend to create new weather object.
    saveWeather(weather: Weather): Subscription{

        return this._weatherService
            .postWeatherAPI(weather)
            .subscribe(
                data => {
                        this.weather1.id = data.id;
                        this.weather1.name = data.name;
                        this.weather1.date = data.date;
                        this.weather1.tempC = data.tempC;
                        this.weather1.summary = data.summary;
                        this.weather1.city = data.city;
                        this.weather1.temperatureF = data.temperatureF;
                        console.log("saved new weather : ");
                        console.log(data);
                        // refresh the data in the browser to get he newly sabed weather object.
                        this.getAllWeathers();
                        console.log("type of date sent back to client : ");
                        console.log(typeof (this.weather1.date));
                    },
                    error => {
                        console.log("error saving weather : " + error);
                    }
            );
    }

    putWeather(weather: Weather): Subscription {
        return this._weatherService
            .putWeatherAPI(weather)
            .subscribe(
                data => {
                    this.weather1 = data;
                    console.log("edited weather : ");
                    console.log(data);
                    this.getAllWeathers();
                },
                error => {
                    console.log("error editing weather : " + error);
                }
            );
    }

     //routeWeather(): string {
    //    var arrayString = [];
    //    console.log(this.route.toString());
    //    this.route.url.forEach(function (elem) {
    //        arrayString.push(elem);
    //        console.log(elem);
    //        console.log(elem["0"]["path"]);
    //    });
    //    if (arrayString[1] != undefined && arrayString[1]["0"]["path"] == "at") {
    //        console.log("GOT YOU");
    //        return "Weather Check";
    //    } else {
    //        return "Welcome";
    //    }
    //}
}




