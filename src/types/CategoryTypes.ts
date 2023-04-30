import { Company } from "./CompanyTypes";

export interface Category {
    categoryId: number;
    categoryName: string;
    companies?: Company[]
}