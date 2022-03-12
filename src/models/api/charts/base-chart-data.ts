export default class BaseAPIData {
    timestamps?: number[];

    constructor(data: BaseAPIData) {
        this.timestamps = data.timestamps;
    }
}
