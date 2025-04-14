import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCidadeDto {
  @IsNotEmpty()
  nome: string;

  @IsInt()
  ufId: number;
}