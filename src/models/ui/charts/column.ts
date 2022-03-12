import { BaseChartSeriesBuilder, IChartSeries } from "./base";
import { ColumnUIChartDataObject } from "./data-objects";

export class ColumnChartSeries extends BaseChartSeriesBuilder<ColumnUIChartDataObject> implements IChartSeries {
    constructor() {
        super();
    }

    addSeriesData(data_object: ColumnUIChartDataObject) {
        
    }
}
