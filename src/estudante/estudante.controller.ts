import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EstudanteService } from './estudante.service';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Controller('estudante')
export class EstudanteController {
  constructor(private readonly estudanteService: EstudanteService) {}

  @Post()
  create(@Body() createEstudanteDto: CreateEstudanteDto) {
    return this.estudanteService.create(createEstudanteDto);
  }

  @Get()
  findAll() {
    return this.estudanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudanteService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEstudanteDto: UpdateEstudanteDto) {
    return this.estudanteService.update(+id, updateEstudanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudanteService.remove(+id);
  }
}