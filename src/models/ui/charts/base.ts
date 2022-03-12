import { BaseUIChartDataObject } from "./data-objects";

export interface IChartSeries {
    
}

export abstract class BaseChartSeriesBuilder<T extends BaseUIChartDataObject> {
    protected _data: T[] = [];
    protected _type: string = "line";
    protected _name: string = "";

    constructor() {

    }

    setName(name: string): BaseChartSeriesBuilder<T> {
        this._name = name;
        return this;
    }

    setType(type: string): BaseChartSeriesBuilder<T> {
        this._type = type;
        return this;
    }

    setData(data: any[]): BaseChartSeriesBuilder<T> {
        this._data = data;
        return this;
    }

    get data() {
        return this._data;
    }

    get type() {
        return this._type;
    }

    get name() {
        return this._name;
    }

}
