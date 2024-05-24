import { ConfigService } from '@nestjs/config';
import {
    DatabaseConfiguration,
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_URL,
} from './model/database-configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    private _databaseConfig: DatabaseConfiguration;

    get databaseConfig(): DatabaseConfiguration {
        return this._databaseConfig;
    }

    private set databaseConfig(value: DatabaseConfiguration) {
        this._databaseConfig = value;
    }

    constructor(private nestConfigService: ConfigService) {
        this.setupEnvironment();
    }

    private setupEnvironment(): void {
        const databasePort = this.nestConfigService.get<string>(
            DATABASE_PORT,
            '24000',
        );
        const databaseName = this.nestConfigService.get<string>(
            DATABASE_NAME,
            'nestjs-final-test-db',
        );
        const databaseUrl = this.nestConfigService.get<string>(DATABASE_URL);

        this._databaseConfig = {
            [DATABASE_NAME]: databaseName,
            [DATABASE_PORT]: databasePort,
            [DATABASE_URL]: databaseUrl,
        };
    }

    private getVariableFromEnvFile(key: string): string {
        const variable = this.nestConfigService.get<string>(key);
        if (!variable) {
            throw new Error(`No ${key} could be found from env file.`);
        }
        return variable;
    }
}
