import { User as UserModel } from "@prisma/client";

export class UserEntity implements UserModel {
    id: number;
    email: string;
    name: string;
    password: string;
}
