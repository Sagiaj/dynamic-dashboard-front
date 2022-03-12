export default class APIDataPollingIntervalSingleton {
    private static _instance?: APIDataPollingIntervalSingleton;
    private _interval?: number;

    private constructor() {}

    static getInstance(): APIDataPollingIntervalSingleton {
        if (!this._instance) {
            this._instance = new APIDataPollingIntervalSingleton();
        };

        return this._instance;
    }

    clearInterval() {
        if (this._interval) {
            window.clearInterval(this._interval);
        }
    }

    setInterval(callback: TimerHandler, interval_ms: number = 5000): number {
        this.clearInterval();
        this._interval = window.setInterval(callback, interval_ms);
        return this._interval;
    }
}
