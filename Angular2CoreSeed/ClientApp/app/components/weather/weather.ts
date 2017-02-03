export interface IWeather {
    id: number;
    name: string;
    date: Date;
    tempC?: number;
    summary?: string;
    city?: string;
    temperatureF?: number;
}

export class Weather implements IWeather {
    constructor(
        public id: number,
        public name: string,
        public date: Date,
        public tempC?: number,
        public summary?: string,
        public city?: string,
        public temperatureF?: number) { }
}