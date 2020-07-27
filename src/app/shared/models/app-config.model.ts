export interface IAppConfig {
  env: {
    name: string;
  };
  apiEndpoints: {
    base: string;
    get: {
      people: string;
    }
  };
}
