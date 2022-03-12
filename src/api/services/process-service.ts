import AxiosService from "./base/axios";

class ProcessService extends AxiosService {
  constructor() {
    super();
  }

  async upsertFile(env: string) {
    try {
      const url = `process/upsert-file`;
      let data = await this.send(url, AxiosService.HTTP_METHODS.get);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const processService = new ProcessService();
export default processService;
