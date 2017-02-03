import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Weather } from '../weather/weather';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Component({
    selector: 'delete',
    template: require('./delete.component.html')
})
export class DeleteComponent {
    @Input() isDelete: boolean;
    @Input() weatherToDeleteId: number;
    @Output() deleteSuccess: EventEmitter<boolean>;
    public idToDelete: number;
    public isShowDelete: boolean;
    constructor(private _weatherService: WeatherService, private _route: ActivatedRoute) {
        this.idToDelete = null;
        this.isShowDelete = false;
        this.deleteSuccess = new EventEmitter<boolean>();
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.isDelete) {
            // pop up open
            console.log("in delete : " + this.isDelete);
        }
    }

    hideNotif() {
        this.isShowDelete = false;
    }

    onDeleteData() {
        this.idToDelete = this.weatherToDeleteId;
        this.deleterWeatherById(this.idToDelete);
    }

    cancelDelete() {
        this.deleteSuccess.emit(false);
    }

    deleterWeatherById(id: number) {
        this._weatherService.deleteWeatherByIdAPI(id)
            .subscribe(
                result => {
                    this.deleteSuccess.emit(true);
                    this.isShowDelete = true;
                    console.log("SUCCESS DELETE in component");
                },
                error => {
                    console.log("ERROR DELETE in component");
                }
            );
    }

}