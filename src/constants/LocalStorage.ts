import { Manager } from "../types/ManagerTypes";

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