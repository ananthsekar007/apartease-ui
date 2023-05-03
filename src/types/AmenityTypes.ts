import { Apartment } from "./ApartmentTypes";
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