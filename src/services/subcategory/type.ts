import { ELang } from "@/common/enum"
import { ImageUpload } from "../image/type"

export type SubCategory = {
    id?: string

    name: string
    langCode: ELang
    categoryId: string
    path?: string;
    image?: ImageUpload;

    createdAt?: Date | string
    updatedAt?: Date | string
}