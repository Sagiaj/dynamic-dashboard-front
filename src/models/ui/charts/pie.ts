import { BaseChartSeriesBuilder, IChartSeries } from "./base";
import { PieUIChartDataObject } from "./data-objects";

export class PieChartSeries extends BaseChartSeriesBuilder<PieUIChartDataObject> implements IChartSeries {
    constructor() {
        super();
    }

    addSeriesData(data_object: PieUIChartDataObject) {
        
    }
}
