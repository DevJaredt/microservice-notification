export interface IRouterModule<T> {
  initRoutes(): void;
  getRouter(): T;
}
