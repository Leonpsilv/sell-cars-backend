import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarPhoto } from "./CarPhoto";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    Name!: string

    @Column()
    Brand!: string

    @Column()
    Model!: string

    @Column()
    Price!: number

    @OneToOne(() => CarPhoto)
    @JoinColumn()
    carPhoto!: CarPhoto
}