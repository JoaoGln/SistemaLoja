import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Injectable()
export class EstudanteService {
  constructor(
    @InjectRepository(Estudante)
    private estudanteRepository: Repository<Estudante>,
  ) {}

  async create(createEstudanteDto: CreateEstudanteDto): Promise<Estudante> {
    const estudante = this.estudanteRepository.create(createEstudanteDto);
    return this.estudanteRepository.save(estudante);
  }

  async findAll(): Promise<Estudante[]> {
    return this.estudanteRepository.find({ relations: ['cidade', 'cidade.uf'] });
  }

  // Método findOne (novo)
  async findOne(id: number): Promise<Estudante> {
    const estudante = await this.estudanteRepository.findOne({ 
      where: { id },
      relations: ['cidade', 'cidade.uf'],
    });
    if (!estudante) {
      throw new NotFoundException(`Estudante com ID ${id} não encontrado`);
    }
    return estudante;
  }

  // Método update (novo)
  async update(id: number, updateEstudanteDto: UpdateEstudanteDto): Promise<Estudante> {
    const estudante = await this.estudanteRepository.preload({
      id,
      ...updateEstudanteDto,
    });
    if (!estudante) {
      throw new NotFoundException(`Estudante com ID ${id} não encontrado`);
    }
    return this.estudanteRepository.save(estudante);
  }

  // Método remove (novo)
  async remove(id: number): Promise<void> {
    const result = await this.estudanteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estudante com ID ${id} não encontrado`);
    }
  }
}