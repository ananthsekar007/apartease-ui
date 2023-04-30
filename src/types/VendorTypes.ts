import { Company } from "./CompanyTypes";

export interface Vendor {
    vendorId: number;
    firstName: string;
    lastName: string;
    email: string;
    companyId: number;
    phoneNumber: string;
    isActive: boolean;
    street: string;
    city: string;
    state: string;
    zip: string;
    createdAt: Date;
    updatedAt: Date;
    company?: Company;
}