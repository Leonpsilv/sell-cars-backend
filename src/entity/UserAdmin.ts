import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserAdmin {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column()
    cpf!: string

    @Column("varchar", { length: 150, default: "--"})
    role?: string
}