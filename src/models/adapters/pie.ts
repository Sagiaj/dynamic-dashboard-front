import { PieUIChartDataObject } from "../ui/charts/data-objects";
import { BaseSeriesAdapter, IBaseSeriesAdapter } from "./base";
import APIPieChartData from "@/models/api/charts/pie-chart-data";

export class PieSeriesAdapter extends BaseSeriesAdapter<APIPieChartData> implements IBaseSeriesAdapter {

    constructor(data_objects: APIPieChartData[]) {
        super(data_objects);
    }

    adaptAPIToSeriesObjects(): PieUIChartDataObject[] {
        const objects: PieUIChartDataObject[] = [];
        return objects;
    }
}
