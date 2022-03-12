import BaseAPIData from "../api/charts/base-chart-data";
import { IBaseSeriesAdapter } from "./base";
import { ColumnSeriesAdapter } from "./column";
import { LineSeriesAdapter } from "./line";
import { PieSeriesAdapter } from "./pie";

export enum SeriesType {
    Line = "line",
    Column = "column",
    Pie = "pie"
};

export class SeriesAdapterFactory {
    static makeAdapter(series_type: SeriesType, data_objects: BaseAPIData[]): IBaseSeriesAdapter {

        let seriesAdapter: IBaseSeriesAdapter;

        switch (series_type) {
            case SeriesType.Column:
                seriesAdapter = new ColumnSeriesAdapter(data_objects);
                break;
            case SeriesType.Line:
                seriesAdapter = new LineSeriesAdapter(data_objects);
                break;
            case SeriesType.Pie:
                seriesAdapter = new PieSeriesAdapter(data_objects);
                break;
            default:
                throw `Invalid series type '${SeriesType}'`;
        }

        return seriesAdapter;
    }
}