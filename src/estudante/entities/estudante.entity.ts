import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cidade } from '../../cidade/entities/cidade.entity';

@Entity()
export class Estudante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 20 })
  matricula: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'date' })
  dt_nascimento: Date;

  @ManyToOne(() => Cidade, (cidade) => cidade.estudantes)
  cidade: Cidade;
}