import { LineGraphUIChartDataObject } from "../ui/charts/data-objects";
import { BaseSeriesAdapter, IBaseSeriesAdapter } from "./base";
import APILineChartData from "@/models/api/charts/line-chart-data";

export class LineSeriesAdapter extends BaseSeriesAdapter<APILineChartData> implements IBaseSeriesAdapter {

    constructor(data_objects: APILineChartData[]) {
        super(data_objects);
    }

    adaptAPIToSeriesObjects(): LineGraphUIChartDataObject[] {
        const objects: LineGraphUIChartDataObject[] = [];

        if (this._api_data_objects) {
            for (let object of this._api_data_objects) {
                object.timestamps
            }
        }

        return objects;
    }
}
