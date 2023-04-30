import { Manager } from "./ManagerTypes";
import { Resident } from "./ResidentTypes";

export interface  Apartment {
    apartmentId: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    managerId: number;
    createdAt: Date;
    updatedAt: Date;
    manager? : Manager;
    residents? : Resident[];
}