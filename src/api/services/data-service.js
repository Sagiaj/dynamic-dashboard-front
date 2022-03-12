import AxiosService from "./base/axios";
class APIDataService extends AxiosService {
    constructor() {
        super();
    }
    async getDetections(time_from, time_to) {
        try {
            const url = `/objects/detections`;
            const searchParams = new URLSearchParams();
            if (time_from) {
                searchParams.set("time_from", String(time_from));
            }
            if (time_to) {
                searchParams.set("time_to", String(time_to));
            }
            let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
            return data;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
const apiDataService = new APIDataService();
export default apiDataService;
//# sourceMappingURL=data-service.js.map