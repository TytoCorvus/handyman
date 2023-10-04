import { Injectable } from '@nestjs/common';
import {IConfig, Environment} from './config.model';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
    public config: IConfig;

    constructor() {
        dotenv.config({path: 'configs/local.env'});
        this.config = {
            env: process.env.env as Environment,
            aws: {
                accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
                secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
                region: process.env['AWS_REGION']
            }
        }
    }
}