import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarPhoto{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
    
    @Column()
    url!: string

    @Column({ length: 255, default: "--"})
    key!: string
}