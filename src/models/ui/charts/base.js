export class BaseChartSeriesBuilder {
    constructor() {
        this._data = [];
        this._type = "line";
        this._name = "";
    }
    setName(name) {
        this._name = name;
        return this;
    }
    setType(type) {
        this._type = type;
        return this;
    }
    setData(data) {
        this._data = data;
        return this;
    }
    get data() {
        return this._data;
    }
    get type() {
        return this._type;
    }
    get name() {
        return this._name;
    }
}
//# sourceMappingURL=base.js.map