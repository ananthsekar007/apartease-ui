import { AuthCardProps } from "../components/AuthCard";
import ResidentImage from "../assets/Resident.jpg";
import ManagerImage from "../assets/Manager.jpg";
import VendorImage from "../assets/Vendor.jpg";
import { ManagerRoutes } from "../routes/ManagerRoutes";
import { ResidentRoutes } from "../routes/ResidentRoutes";

export const AuthCardDetails: AuthCardProps[] = [
    {
        title: "Resident",
        content: "Click on this to move to resident screens",
        image: ResidentImage,
        redirectPath: ResidentRoutes.Auth
    },
    {
        title: "Manager",
        content: "Click on this to move to manager screens",
        image: ManagerImage,
        redirectPath: ManagerRoutes.Auth
    },
    {
        title: "Vendor",
        content: "Click on this to move to resident screens",
        image: VendorImage,
        redirectPath: "/vendor"
    },
]

export const VendorStatus: Record<string, string> = {
    OnGoing : "ON-GOING",
    Done: "DONE"
}

export const ResidentStatus: Record<string, string> = {
    OnGoing: "ON-GOING",
    Done: "DONE",
    Revisit: "NEEDS REVISIT"
}

export const StatusColours: Record<string, string> = {
    "ON-GOING": "red",
    "DONE": "green",
    "NEEDS REVISIT": "yellow"
}


export const BASE_API_URL = 'http://localhost:5289/api';