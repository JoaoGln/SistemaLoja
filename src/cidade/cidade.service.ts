// src/cidade/cidade.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async create(createCidadeDto: CreateCidadeDto): Promise<Cidade> {
    const cidade = this.cidadeRepository.create(createCidadeDto);
    return await this.cidadeRepository.save(cidade);
  }

  async findAll(): Promise<Cidade[]> {
    return await this.cidadeRepository.find({ relations: ['uf'] });
  }

  async findOne(id: number): Promise<Cidade> {
    const cidade = await this.cidadeRepository.findOne({ 
      where: { id },
      relations: ['uf']
    });
    
    if (!cidade) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada`);
    }
    
    return cidade;
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto): Promise<Cidade> {
    const cidade = await this.findOne(id); // Reutiliza o findOne com tratamento de erro
    Object.assign(cidade, updateCidadeDto);
    return await this.cidadeRepository.save(cidade);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cidadeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada`);
    }
  }
}