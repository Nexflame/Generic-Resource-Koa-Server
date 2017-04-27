import WritableStream = NodeJS.WritableStream;

export interface LoggerConfig {
  level: string;
  src: boolean;
  stream: WritableStream;
  pathFile: string;
}
