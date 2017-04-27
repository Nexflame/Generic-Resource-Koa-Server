import {getLogger} from './logger';
import {getConfig} from '../config/server-config';

const mongoose = require('mongoose');

const databaseConfig: any = getConfig().databaseConfig;
const logger = getLogger("Mongo Database connection");

export const dbConnectionDefaultURL = `mongodb://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}`;


export async function connectToDatabase(url: string) {
    return new Promise((resolve) => {
        mongoose.connection
            .on('error', (error: string) => {
                logger.error(`Unable to connect to the database: ${error}`);
                setTimeout(() => mongoose.connect(url), 500);
            })
            .on('open', () => {
                logger.info(`Database connection opened`);
                resolve(mongoose.connections[0]);
            })
            .on('close', () => {
                logger.info(`Database connection closed`);
            });
        mongoose.connect(url);
        logger.info('Connecting to the database ...')
    });
}

export const DATABASE_STATUS = {
    DISCONNECTED: 0,
    CONNECTED: 1,
    CONNECTING: 2,
    DISCONNECTING: 3
};

export function getDatabaseStatus() {
    return mongoose.connection.readyState
}

export function getMongooseInstance() {
    return mongoose;
}
