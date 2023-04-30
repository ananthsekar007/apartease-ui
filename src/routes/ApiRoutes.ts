import { BASE_API_URL } from "../constants/AppConstants";

export const ManagerApiRoutes = {
    SignIn : `${BASE_API_URL}/auth/manager/signin`,
    Login : `${BASE_API_URL}/auth/manager/login`
}

export const ResidentApiRoutes = {
    SignIn : `${BASE_API_URL}/auth/resident/signin`,
    Login : `${BASE_API_URL}/auth/resident/login`,
}

export const ApartmentApiRoutes = {
    GetAllApartments: `${BASE_API_URL}/apartments/get`
}