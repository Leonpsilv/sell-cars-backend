import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserAdmin {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    Name!: string

    @Column()
    Password!: string

    @Column()
    Email!: string

    @Column()
    Cpf!: string
}