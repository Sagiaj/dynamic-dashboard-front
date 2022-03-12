export default class APIDataPollingIntervalSingleton {
    constructor() { }
    static getInstance() {
        if (!this._instance) {
            this._instance = new APIDataPollingIntervalSingleton();
        }
        ;
        return this._instance;
    }
    clearInterval() {
        if (this._interval) {
            window.clearInterval(this._interval);
        }
    }
    setInterval(callback, interval_ms = 5000) {
        this.clearInterval();
        this._interval = window.setInterval(callback, interval_ms);
        return this._interval;
    }
}
//# sourceMappingURL=api-data-polling-interval-singleton.js.map