import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uf } from './uf/entities/uf.entity';
import { Cidade } from './cidade/entities/cidade.entity';
import { Estudante } from './estudante/entities/estudante.entity';
import { UfModule } from './uf/uf.module';
import { CidadeModule } from './cidade/cidade.module';
import { EstudanteModule } from './estudante/estudante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Uf, Cidade, Estudante],
      synchronize: true,
    }),
    UfModule,
    CidadeModule,
    EstudanteModule,
  ],
})
export class AppModule {}