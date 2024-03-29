import { Column, Entity } from "typeorm";
import BaseEntity from "./base-entity.entity";

@Entity({ name: "user"})
export class UserEntity extends BaseEntity{
    @Column()
    name!: string;

    @Column()
    telefone!: string;
}