import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade])],
  controllers: [CidadeController],
  providers: [CidadeService],
})
export class CidadeModule {}