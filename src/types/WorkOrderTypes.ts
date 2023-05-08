import { Apartment } from "./ApartmentTypes";
import { Resident } from "./ResidentTypes";
import { Vendor } from "./VendorTypes";

export interface WorkOrder {
    workOrderId: number;
    workOrderTitle: string;
    workOrderDescription: string;
    apartmentId: number;
    vendorId: number;
    residentId: number;
    vendorStatus: string;
    residentStatus:	string;
    acceptedByVendor: boolean;
    cancelledByVendor: boolean;
    createdAt: Date;
    updatedAt: Date;
    apartment?: Apartment;
    vendor?: Vendor;
    resident?: Resident;
}