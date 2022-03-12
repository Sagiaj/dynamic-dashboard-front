import { BaseSeriesAdapter } from "./base";
export class LineSeriesAdapter extends BaseSeriesAdapter {
    constructor(data_objects) {
        super(data_objects);
    }
    adaptAPIToSeriesObjects() {
        const objects = [];
        if (this._api_data_objects) {
            for (let object of this._api_data_objects) {
                object.timestamps;
            }
        }
        return objects;
    }
}
//# sourceMappingURL=line.js.map