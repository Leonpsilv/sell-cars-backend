import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CarPhoto } from "./CarPhoto";
import { Seller } from "./Seller";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @Column({ length: 100, default: "--" })
  alt!: string;

  @OneToOne(() => CarPhoto)
  @JoinColumn()
  carPhoto!: CarPhoto;

  @ManyToOne(() => Seller)
  seller!: Seller | any;
}
