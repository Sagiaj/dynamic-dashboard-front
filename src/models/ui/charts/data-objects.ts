export abstract class BaseUIChartDataObject {
    protected _type: ApexChart['type'];
    protected _name: string = "";
    protected _timestamp: number = 0;
    protected _data: string[] = [];

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

    setType(chart_type: ApexChart['type']) {
        this._type = chart_type;
        return this;
    }
    
    setName(xlabel_name: string) {
        this._name = xlabel_name;
        return this;
    }

    setTimestamp(timestamp: number) {
        this._timestamp = timestamp;
        return this;
    }

    setValues(values: string[]) {
        this._data = values;
        return this;
    }
}

export class LineGraphUIChartDataObject extends BaseUIChartDataObject {
    constructor(xlabel_name: string) {
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
    constructor(xlabel_name: string) {
        super();
        this.setType("bar")
            .setName(xlabel_name);
    }
}

export class PieUIChartDataObject extends BaseUIChartDataObject {
    constructor(xlabel_name: string) {
        super();
        this.setType("pie")
            .setName(xlabel_name);
    }
}
