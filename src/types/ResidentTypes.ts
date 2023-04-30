import { Apartment } from "./ApartmentTypes";

export interface Resident {
    residentId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    street: string;
    city: string;
    state: string;
    zip: string;
    apartmentId: number;
    createdAt: Date;
    updatedAt: Date;
    apartment?: Apartment
}