import { Category } from "./CategoryTypes";

export interface Company {
    companyId: number;
    companyName: string;
    companyZip: string;
    categoryId: number;
    vendor: any;
    category?: Category;
}