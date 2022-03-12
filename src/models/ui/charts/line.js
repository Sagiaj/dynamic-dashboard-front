import { BaseChartSeriesBuilder } from "./base";
export class LineChartSeries extends BaseChartSeriesBuilder {
    constructor() {
        super();
    }
    addSeriesData(data_object) {
        this._data.push(data_object);
    }
}
//# sourceMappingURL=line.js.map