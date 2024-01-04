import { ILike } from "typeorm";
import { AppdataSource } from "../../../shared/infra/db/data-source";
import { UserEntity } from "../../../shared/infra/db/entities";
import { NewUserDTO, UserDetailDTO } from "../dto";
import { randomUUID } from "crypto";

export class UserRepository{
    private _repository = AppdataSource.getRepository(UserEntity);

    private mapEntity(entity: UserEntity){
        return{
            id: entity.id,
            name: entity.name,
            telefone: entity.telefone
        }
    }

    async saveUser(user: NewUserDTO): Promise<boolean>{

        const UserEntity = this._repository.create({
            id: randomUUID(),
            name: user.name,
            telefone:user.telefone
        });

        await this._repository.save(UserEntity);

        return true;
    }

    async verifyID(id: string): Promise<boolean>{
        const exist = await this._repository.manager.exists(UserEntity, {
            where: {
                id,
            }
        })

        return exist;
    }

    async getAllUsers(name?: string): Promise<UserDetailDTO[]> {
        const usersEntity = await this._repository.manager.find(UserEntity, {
            where: {
                name: ILike(`%${name ?? ""}%`)
            }
        })

        const users = usersEntity.map<UserDetailDTO>(
            (user) => ({
            id: user.id,
            name: user.name,
            telefone: user.telefone
            })
        )

        return users;
    }  
}