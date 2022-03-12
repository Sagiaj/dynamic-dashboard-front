import axios from "axios";
// const defaultBaseUrl = `${document.location.origin}/back`;
const defaultBaseUrl = `http://localhost:3333/back`;
const axiosInstance = axios.create({
    baseURL: defaultBaseUrl
});
class AxiosService {
    constructor() {
        this.axios = axiosInstance;
    }
    async send(relative_url, method, queryParams = "", bodyParams = {}, additionalHeaders = {}) {
        try {
            let response = null;
            switch (method) {
                case AxiosService.HTTP_METHODS.get:
                    response = await this.axios.get(relative_url);
                    break;
                case AxiosService.HTTP_METHODS.post:
                    response = await this.axios.post(relative_url, bodyParams);
                    break;
                case AxiosService.HTTP_METHODS.delete:
                    response = await this.axios.delete(relative_url, {
                        data: bodyParams
                    });
                    break;
                default:
                    return Promise.reject(`Unrecorgnized method ${method}`);
            }
            if (!response || response.status != 200) {
                return Promise.reject("Error retrieving user");
            }
            return Promise.resolve(response.data);
        }
        catch (err) {
            console.log("Errored in AxiosService/send:", err.response);
            return Promise.reject(err.response.data);
        }
    }
}
AxiosService.HTTP_METHODS = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE"
};
export default AxiosService;
export { axiosInstance };
//# sourceMappingURL=axios.js.map