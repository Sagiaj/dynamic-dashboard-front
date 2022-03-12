import moment from "moment";
import AxiosService from "./base/axios";

class APIDataService extends AxiosService {
  constructor() {
    super();
  }

  async getDetections(time_from: number, time_to: number) {
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
    } catch (err) {
      throw err;
    }
  }
  
  async getDetectionsHourlyAverage(time_from?: number) {
    try {
      const url = `/objects/detections-hourly-average`;
      const searchParams = new URLSearchParams();
      if (time_from) {
        searchParams.set("time_from", String(time_from));
      }
      let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async getTotalDetectionsByType(time_from?: number) {
    try {
      const url = `/objects/group-total-detections`;
      const searchParams = new URLSearchParams();
      if (time_from) {
        searchParams.set("time_from", String(time_from));
      }
      let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async saveDailyThreshold(threshold: number) {
    try {
      const url = `/experiments/flag`;
      const body = { threshold };
      let data = await this.send(url, AxiosService.HTTP_METHODS.post, null, body);
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async getDailyThreshold() {
    try {
      const url = `/experiments/flag`;
      let data = await this.send(url, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async getExperiments(time_from?: number, time_to?: number) {
    try {
      const url = `/experiments`;
      const searchParams = new URLSearchParams();
      if (!time_from) {
        time_from = moment().utc().subtract(1, "year").unix() * 1000;
      }
      if (!time_to) {
        time_to = moment().utc().unix() * 1000;
      }
      searchParams.set("time_from", String(time_from));
      searchParams.set("time_to", String(time_to));
      let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  async getLastNotifications(limit: number = 5) {
    try {
      const url = `/notifications`;
      const searchParams = new URLSearchParams();
      searchParams.set("limit", String(limit));
      let data = await this.send(`${url}?${searchParams.toString()}`, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getSystemModeAndThreshold() {
    try {
      const url = `/system`;
      let data = await this.send(url, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

const apiDataService = new APIDataService();
export default apiDataService;
