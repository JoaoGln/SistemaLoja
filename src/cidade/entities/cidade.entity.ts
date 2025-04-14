import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Uf } from '../../uf/entities/uf.entity';
import { Estudante } from '../../estudante/entities/estudante.entity';

@Entity()
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @ManyToOne(() => Uf, (uf) => uf.cidades)
  uf: Uf;

  @OneToMany(() => Estudante, (estudante) => estudante.cidade)
  estudantes: Estudante[];
}