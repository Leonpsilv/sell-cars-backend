import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarPhoto{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    Name!: string
    
    @Column()
    Link!: string
}