import { Manager } from "../types/ManagerTypes";
import { Resident } from "../types/ResidentTypes";
import { Vendor } from "../types/VendorTypes";

const AppEazeManager = "AppEazeManager";
const AppEazeResident = "AppEazeResident";
const AppEazeVendor = "AppEazeVendor";

const AppEazeManagerToken = "AppEazeManagerToken";
const AppEazeResidentToken = "AppEazeResidentToken";
const AppEazeVendorToken = "AppEazeManagerToken";

export const setManager = (manager : Manager) => {
    localStorage.setItem(AppEazeManager, JSON.stringify(manager));
}

export const getManager = () : Manager | null => {
    let user = localStorage.getItem(AppEazeManager);
    if(!user) return null; 
    return JSON.parse(user);
}

export const setManagerAuthToken = (token: string) => {
    localStorage.setItem(AppEazeManagerToken, token);
}

export const getManagerAuthToken = (): string | null => {
    return localStorage.getItem(AppEazeManagerToken);
}

export const setResident = (resident : Resident) => {
    localStorage.setItem(AppEazeResident, JSON.stringify(resident));
}

export const getResident = () : Resident | null => {
    let user = localStorage.getItem(AppEazeResident);
    if(!user) return null; 
    return JSON.parse(user);
}

export const setResidentAuthToken = (token: string) => {
    localStorage.setItem(AppEazeResidentToken, token);
}

export const getResidentAuthToken = (): string | null => {
    return localStorage.getItem(AppEazeResidentToken);
}

export const setVendor = (vendor : Vendor) => {
    localStorage.setItem(AppEazeVendor, JSON.stringify(vendor));
}

export const getVendor = () : Vendor | null => {
    let user = localStorage.getItem(AppEazeVendor);
    if(!user) return null; 
    return JSON.parse(user);
}

export const setVendorAuthToken = (token: string) => {
    localStorage.setItem(AppEazeVendorToken, token);
}

export const getVendorAuthToken = (): string | null => {
    return localStorage.getItem(AppEazeVendorToken);
}