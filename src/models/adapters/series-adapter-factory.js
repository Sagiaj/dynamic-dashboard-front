import { ColumnSeriesAdapter } from "./column";
import { LineSeriesAdapter } from "./line";
import { PieSeriesAdapter } from "./pie";
export var SeriesType;
(function (SeriesType) {
    SeriesType["Line"] = "line";
    SeriesType["Column"] = "column";
    SeriesType["Pie"] = "pie";
})(SeriesType || (SeriesType = {}));
;
export class SeriesAdapterFactory {
    static makeAdapter(series_type, data_objects) {
        let seriesAdapter;
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
//# sourceMappingURL=series-adapter-factory.js.map