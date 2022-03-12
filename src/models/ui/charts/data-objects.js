export class BaseUIChartDataObject {
    constructor() {
        this._name = "";
        this._timestamp = 0;
        this._data = [];
    }
    get type() {
        return this._type;
    }
    get name() {
        return this._name;
    }
    get timestamp() {
        return this._timestamp;
    }
    get data() {
        return this._data;
    }
    setType(chart_type) {
        this._type = chart_type;
        return this;
    }
    setName(xlabel_name) {
        this._name = xlabel_name;
        return this;
    }
    setTimestamp(timestamp) {
        this._timestamp = timestamp;
        return this;
    }
    setValues(values) {
        this._data = values;
        return this;
    }
}
export class LineGraphUIChartDataObject extends BaseUIChartDataObject {
    constructor(xlabel_name) {
        super();
        this.setType("line")
            .setName(xlabel_name);
    }
    toObject() {
        return {
            data: [],
            name: this.name,
            type: this.type
        };
    }
}
export class ColumnUIChartDataObject extends BaseUIChartDataObject {
    constructor(xlabel_name) {
        super();
        this.setType("bar")
            .setName(xlabel_name);
    }
}
export class PieUIChartDataObject extends BaseUIChartDataObject {
    constructor(xlabel_name) {
        super();
        this.setType("pie")
            .setName(xlabel_name);
    }
}
//# sourceMappingURL=data-objects.js.map