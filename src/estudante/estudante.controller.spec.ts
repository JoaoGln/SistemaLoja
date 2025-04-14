import { Test, TestingModule } from '@nestjs/testing';
import { EstudanteController } from './estudante.controller';
import { EstudanteService } from './estudante.service';

describe('EstudanteController', () => {
  let controller: EstudanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudanteController],
      providers: [EstudanteService],
    }).compile();

    controller = module.get<EstudanteController>(EstudanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
