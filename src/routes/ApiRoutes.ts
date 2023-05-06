import { BASE_API_URL } from "../constants/AppConstants";

export const ManagerApiRoutes = {
    SignIn : `${BASE_API_URL}/auth/manager/signin`,
    Login : `${BASE_API_URL}/auth/manager/login`
}

export const ResidentApiRoutes = {
    SignIn : `${BASE_API_URL}/auth/resident/signin`,
    Login : `${BASE_API_URL}/auth/resident/login`,
    GetActiveResidents: `${BASE_API_URL}/resident/get/active`,
    GetInactiveResidents: `${BASE_API_URL}/resident/get/inactive`,
    ChangeResidentStatus: `${BASE_API_URL}/resident/change-status`,
    GetResidentActivityStatus: `${BASE_API_URL}/resident/get/status`
}

export const VendorApiRoutes = {
    SignIn: `${BASE_API_URL}/auth/vendor/signin`,
    Login:  `${BASE_API_URL}/auth/vendor/login`
}

export const ApartmentApiRoutes = {
    GetAllApartments: `${BASE_API_URL}/apartments/get`,
    AddApartment: `${BASE_API_URL}/apartments/add`,
    GetApartmentForManager : `${BASE_API_URL}/apartments/get`
}

export const CompanyApiRoutes = {
    CreateCompany :  `${BASE_API_URL}/company/create`,
    EditCompany:   `${BASE_API_URL}/company/edit`,
    GetAllCompanies: `${BASE_API_URL}/company/get`,
    DeleteCompany : `${BASE_API_URL}/company`
}

export const CategoryApiRoutes  = {
    GetCategoreies: `${BASE_API_URL}/category/get`
}

export const AmenityApiRoutes = {
    AddAmenity: `${BASE_API_URL}/amenity/add`,
    UpdateAmenity: `${BASE_API_URL}/amenity/update`,
    GetAmenityForApartment: `${BASE_API_URL}/amenity/get`,
}

export const AmenityBookingApiRoutes = {
    BookAmenity: `${BASE_API_URL}/amenitybooking/add`
}
