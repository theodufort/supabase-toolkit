export interface Config {
  app: {
    name: string;
    description: string;
  };
  auth: {};
  toast_notification: {
    position:
      | "top-right"
      | "top-center"
      | "top-left"
      | "bottom-right"
      | "bottom-center"
      | "bottom-left";
  };
}
