import { Test, TestingModule } from '@nestjs/testing';
import { EstudanteService } from './estudante.service';

describe('EstudanteService', () => {
  let service: EstudanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudanteService],
    }).compile();

    service = module.get<EstudanteService>(EstudanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
