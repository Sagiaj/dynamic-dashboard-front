import { BaseChartSeriesBuilder, IChartSeries } from "./base";
import { LineGraphUIChartDataObject } from "./data-objects";

export class LineChartSeries extends BaseChartSeriesBuilder<LineGraphUIChartDataObject> implements IChartSeries {
    constructor() {
        super();
    }

    addSeriesData(data_object: LineGraphUIChartDataObject) {
        this._data.push(data_object);
    }
}
