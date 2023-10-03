export interface IConfig {
    env: Environment,
    aws: {
        accessKeyId: string,
        secretAccessKey: string,
        region: string
    }
}

export enum Environment {
    LOCAL = 'localhost',
    DEV = 'development',
    PROD = 'production'
}