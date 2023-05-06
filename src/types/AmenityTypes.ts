import { Apartment } from "./ApartmentTypes";
import { Manager } from "./ManagerTypes";
import { Resident } from "./ResidentTypes";
export interface Amenity {
    amenityId: number,
    amenityName: string,
    amenityDescription: string,
    amenityContactNumber: string,
    amenityAddress: string,
    allowWeekend: true,
    mininumBookingHour: number,
    apartmentId: number,
    createdAt: Date,
    updatedAt: Date,
    apartment?: Apartment
}

export interface AmenityBooking {
    amenityBookingId: number;
    amenityId: number;
    guestName: string;
    guestEmail: string;
    from: Date;
    to: Date;
    residentId: number;
    managerId: number;
    amenity?: Amenity;
    resident?: Resident;
    manager?: Manager;
}