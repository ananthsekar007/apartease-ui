import { BASE_API_URL } from "../constants/AppConstants";

export const ManagerApiRoutes = {
    SignIn : `${BASE_API_URL}/auth/manager/signin`,
    Login : `${BASE_API_URL}/auth/manager/login`
}

export const ResidentApiRoutes = {
    SignIn : `${BASE_API_URL}/auth/resident/signin`,
    Login : `${BASE_API_URL}/auth/resident/login`,
}

export const VendorApiRoutes = {
    SignIn: `${BASE_API_URL}/auth/vendor/signin`,
    Login:  `${BASE_API_URL}/auth/vendor/login`
}

export const ApartmentApiRoutes = {
    GetAllApartments: `${BASE_API_URL}/apartments/get`
}

export const CompanyApiRoutes = {
    CreateCompany :  `${BASE_API_URL}/company/create`,
    EditCompany:   `${BASE_API_URL}/company/edit`,
    GetAllCompanies: `${BASE_API_URL}/company/get`
}

export const CategoryApiRoutes  = {
    GetCategoreies: `${BASE_API_URL}/category/get`
}
