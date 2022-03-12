import BaseAPIData from "./base-chart-data";

export default class APILineChartData extends BaseAPIData {
    [object_type: string]: any;

    constructor(data: APILineChartData) {
        super(data);
        const { timestamps, ...object_types } = data;
        for (let object_type in object_types) {
            this[object_type] = object_types[object_type];
        }
    }
}
