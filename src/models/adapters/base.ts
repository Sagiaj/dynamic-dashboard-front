import BaseAPIData from "@/models/api/charts/base-chart-data";
import { BaseUIChartDataObject } from "../ui/charts/data-objects";

export interface IBaseSeriesAdapter {
    adaptAPIToSeriesObjects(): BaseUIChartDataObject[];
}

export abstract class BaseSeriesAdapter<T extends BaseAPIData> implements IBaseSeriesAdapter {
    protected _api_data_objects?: T[];

    constructor(data_objects: T[]) {
        this._api_data_objects = data_objects;;
    };

    abstract adaptAPIToSeriesObjects(): BaseUIChartDataObject[];
}
