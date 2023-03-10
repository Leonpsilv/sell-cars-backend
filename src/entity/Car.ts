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

    @Column()
    Description!: string

    @Column({ length: 100, default:"--"})
    Alt!: string

    @OneToOne(() => CarPhoto)
    @JoinColumn()
    carPhoto!: CarPhoto
}