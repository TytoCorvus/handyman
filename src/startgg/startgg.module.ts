import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from 'src/config/config.module';
import { StartggService } from './startgg.service';

@Module({
    providers: [StartggService],
    exports: [StartggService],
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
          }),
    ]
})
export class StartggModule {}
