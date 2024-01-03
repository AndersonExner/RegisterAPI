import { Column, Entity } from "typeorm";
import BaseEntity from "./base-entity.entity";

@Entity({ name: "users"})
export class UserEntity extends BaseEntity{
    @Column()
    name!: string;

    @Column()
    telefone!: string;
}