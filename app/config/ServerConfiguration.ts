import {LoggerConfig} from './LoggerConfig';
import {DatabaseConfig} from './DatabaseConfig';
import {AuthConfig} from "./AuthConfig";

export interface ServerConfiguration {
    // Core server config
    port: number;

    // Generic server config
    deadLineMessage: string;
    loggerConfig: LoggerConfig;
    databaseConfig: DatabaseConfig;
    authConfig: AuthConfig;
    uploadFolder: {
        userUploads: string,
        templates: string
    };
    serverMail: {
        service: string,
        username: string,
        password: string
    };
}
