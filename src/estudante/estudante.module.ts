import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudante } from './entities/estudante.entity';
import { EstudanteService } from './estudante.service';
import { EstudanteController } from './estudante.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudante]), // Isso permite a injeção do Repository
  ],
  controllers: [EstudanteController],
  providers: [EstudanteService],
})
export class EstudanteModule {}