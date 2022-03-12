import { ColumnUIChartDataObject } from "../ui/charts/data-objects";
import { BaseSeriesAdapter, IBaseSeriesAdapter } from "./base";
import APIColumnChartData from "@/models/api/charts/column-chart-data";

export class ColumnSeriesAdapter extends BaseSeriesAdapter<APIColumnChartData> implements IBaseSeriesAdapter {
    
    constructor(data_objects: APIColumnChartData[]) {
        super(data_objects);
    }

    adaptAPIToSeriesObjects(): ColumnUIChartDataObject[] {
        throw new Error("Method not implemented.");
    }
}
