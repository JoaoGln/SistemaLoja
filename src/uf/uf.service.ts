import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uf } from './entities/uf.entity';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';

@Injectable()
export class UfService {
  constructor(
    @InjectRepository(Uf)
    private ufRepository: Repository<Uf>,
  ) {}

  async create(createUfDto: CreateUfDto): Promise<Uf> {
    const uf = this.ufRepository.create(createUfDto);
    return await this.ufRepository.save(uf);
  }

  async findAll(): Promise<Uf[]> {
    return await this.ufRepository.find();
  }

  async findOne(id: number): Promise<Uf | null> {
    return this.ufRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUfDto: UpdateUfDto): Promise<Uf | null> {
    await this.ufRepository.update(id, updateUfDto);
    return this.ufRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.ufRepository.delete(id);
  }
}