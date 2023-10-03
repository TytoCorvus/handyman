import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
    providers: [AwsService],
    imports: [ConfigModule],
    exports: [AwsService]
})
export class AwsModule {}
