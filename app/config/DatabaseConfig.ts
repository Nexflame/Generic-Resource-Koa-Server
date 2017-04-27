import WritableStream = NodeJS.WritableStream;

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
}
