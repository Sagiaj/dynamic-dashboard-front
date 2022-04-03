import moment from "moment";
import AxiosService from "./base/axios";
class APIDataService extends AxiosService {
    constructor() {
        super();
    }
    async getDetections(time_from, time_to, density) {
        try {
            const url = `/objects/detections`;
            const searchParams = new URLSearchParams();
            if (time_from) {
                searchParams.set("time_from", String(time_from));
            }
            if (time_to) {
                searchParams.set("time_to", String(time_to));
            }
            if (density) {
                searchParams.set("limit", String(density));
            }
            let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getDetectionsHourlyAverage(time_from) {
        try {
            const url = `/objects/detections-hourly-average`;
            const searchParams = new URLSearchParams();
            if (time_from) {
                searchParams.set("time_from", String(time_from));
            }
            let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getTotalDetectionsByType(time_from) {
        try {
            const url = `/objects/group-total-detections`;
            const searchParams = new URLSearchParams();
            if (time_from) {
                searchParams.set("time_from", String(time_from));
            }
            let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async saveDailyThreshold(threshold) {
        try {
            const url = `/experiments/flag`;
            const body = { threshold };
            let data = await this.send(url, AxiosService.HTTP_METHODS.post, null, body);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getDailyThreshold() {
        try {
            const url = `/experiments/flag`;
            let data = await this.send(url, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getExperiments(time_from, time_to) {
        try {
            const url = `/experiments`;
            const searchParams = new URLSearchParams();
            if (!time_from) {
                time_from = moment().utc().subtract(1, "year").unix() * 1000;
            }
            if (!time_to) {
                time_to = moment().unix() * 1000;
            }
            searchParams.set("time_from", String(time_from));
            searchParams.set("time_to", String(time_to));
            let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getLastNotifications(limit = 5) {
        try {
            const url = `/notifications`;
            const searchParams = new URLSearchParams();
            searchParams.set("limit", String(limit));
            let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getSystemModeAndThreshold() {
        try {
            const url = `/system`;
            let data = await this.send(url, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getCartridgeDates() {
        try {
            const url = `/system/cartridge`;
            let data = await this.send(url, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getSystemMode() {
        try {
            const url = `/system/system-mode`;
            let data = await this.send(url, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
}
const apiDataService = new APIDataService();
export default apiDataService;
//# sourceMappingURL=data-service.js.map