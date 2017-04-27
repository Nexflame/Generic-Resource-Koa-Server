import {ServerConfiguration} from './ServerConfiguration';

const mainConfig:ServerConfiguration = require('../../server-config.json');

export function getConfig(version:any = null):ServerConfiguration
{
    return mainConfig;
}
