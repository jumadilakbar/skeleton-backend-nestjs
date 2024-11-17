export interface AppConfig {
  host: string;
  port: number;
  secret: string;
}

export const configureApp = (): AppConfig => ({
  host: process.env.APP_HOST || '127.0.0.1',
  port: parseInt(process.env.APP_PORT, 10) || 8080,
  secret:
    process.env.APP_SECRET ||
    'a02acfe279bbd3c92af160ad531a1b9f.43fe50ae4434330803a4f35b3b9483e2.8fb8c0fc9e284a54a3830ee0403fafa4',
});
