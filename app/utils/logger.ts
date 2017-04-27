import {getConfig} from "../config/server-config";
import {DB} from "../resources/ensure.schemas";
import {Schemas} from "../resources/schemas";

const bunyan = require('bunyan');
const LogEntryStream = require('bunyan-mongodb-stream')({model: DB.model(Schemas.LogEntry)});

const bunyanStreams = [
    {
        level: getConfig().loggerConfig.level,
        stream: process.stdout
    },
    {
        level: getConfig().loggerConfig.level,
        path: getConfig().loggerConfig.pathFile
    },
    {
        stream: LogEntryStream
    }
];

export function getLogger(tagName: string) {
    return bunyan.createLogger({
            name: tagName,
            streams: bunyanStreams
        }
    );
} 
