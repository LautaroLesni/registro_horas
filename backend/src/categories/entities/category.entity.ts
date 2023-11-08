import { Category as CategoryModel } from "@prisma/client";
export class CategoryEntity implements CategoryModel {
    id: number;
    description: string;
    userId: number;
}
