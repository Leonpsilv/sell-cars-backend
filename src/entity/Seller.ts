import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  tel!: string;
}
