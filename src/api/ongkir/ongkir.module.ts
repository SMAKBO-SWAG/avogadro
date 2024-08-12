import { Module } from '@nestjs/common';
import { OngkirController } from './ongkir.controller';
import { OngkirService } from './ongkir.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OngkirController],
  providers: [OngkirService],
})
export class OngkirModule {}
