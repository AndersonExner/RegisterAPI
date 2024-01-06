export interface UserDetailDTO {
    id: string;
    name: string;
    telefone?: string;
}

export interface NewUserDTO {
    name: string;
    telefone?: string;
}

export interface UpdateUserDTO {
    id: string;
    name?: string;
    telefone?: string;
}

export interface UserForApi{
    name: string;
}