import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Category } from "../../types/CategoryTypes";
import {
  CategoryApiRoutes,
  CompanyApiRoutes,
  VendorApiRoutes,
} from "../../routes/ApiRoutes";
import "../auth.css";
import { UIButton } from "../UIComponents/UIButton";
import { Company } from "../../types/CompanyTypes";
import { setVendor, setVendorAuthToken } from "../../constants/LocalStorage";
import { useNavigate } from "react-router-dom";
import { VendorRoutes } from "../../routes/VendorRoutes";
import { showErrorMessage } from "../Toast";
import { isValidEmail } from "../../constants/AppConstants";

const styles = {
  stepper: {
    backgroundColor: "transparent",
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: "1rem",
    textAlign: "center",
  },
  button: {
    marginRight: "1rem",
  },
};

interface CreateCompanyProps {
  activeStep: number;
  handleNext: () => void;
  categories: Category[];
  onCompanyCreate: (companyId: number) => void;
}

const CreateCompany = (props: CreateCompanyProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const companyCreationInput = Object.fromEntries(formEntries);
    setLoading(true);

    const response = await fetch(CompanyApiRoutes.CreateCompany, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...companyCreationInput,
        categoryId: Number(companyCreationInput.categoryId),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const companyDetails: Company = await response.json();

    setLoading(false);
    props.onCompanyCreate(companyDetails.companyId);
    props.handleNext();
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleCreate}>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          className="form-element"
          name="companyName"
        />
        <TextField
          label="Company Zip"
          variant="outlined"
          fullWidth
          className="form-element"
          name="companyZip"
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="test-select-label">Select Category</InputLabel>
          <Select
            name="categoryId"
            fullWidth
            variant="outlined"
            labelId="test-select-label"
            label="Select Category"
            className="form-element"
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {props.categories &&
              props.categories.length > 0 &&
              props.categories.map((category) => (
                <MenuItem value={category.categoryId}>
                  {category.categoryName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <UIButton
          type="submit"
          fullWidth
          variant="contained"
          className="form-element"
          loading={loading}
        >
          Create
        </UIButton>
      </form>
    </>
  );
};

interface AddVendorProps {
  companyId: number;
}

const AddVendor = (props: AddVendorProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formEntries = new FormData(e.target).entries();
    const vendorInput: any = Object.fromEntries(formEntries);

    Object.keys(vendorInput).forEach((input) => {
      if(vendorInput[input] == "" || vendorInput[input] == undefined) {
        showErrorMessage("Please fill all the fields!");
        return;
      }
    });

    if(!isValidEmail(vendorInput.email)) {
      showErrorMessage("Check the email and try again!");
      return;
    }

    if(vendorInput.password == 0) {
      showErrorMessage("Check the password and try again!");
      return;
    }

    setLoading(true);

    const response = await fetch(VendorApiRoutes.SignIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...vendorInput, companyId: props.companyId }),
    });

    setLoading(false);

    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }

    const signInResponse = await response.json();
    setVendor(signInResponse.vendor);
    setVendorAuthToken(signInResponse.authToken);

    navigate(VendorRoutes.Home);
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Password"
          type="password"
          className="form-element"
          name="password"
          fullWidth
        />
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Street"
          name="street"
          fullWidth
          className="form-element"
        />
        <TextField
          label="City"
          name="city"
          fullWidth
          className="form-element"
        />
        <TextField
          label="State"
          name="state"
          fullWidth
          className="form-element"
        />
        <TextField
          label="Zip Code"
          name="zip"
          fullWidth
          className="form-element"
        />
        <UIButton
          type="submit"
          fullWidth
          variant="contained"
          className="form-element"
          loading={loading}
        >
          Sign Up
        </UIButton>
      </form>
    </>
  );
};

export const VendorSignIn = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  const [createdCompanyId, setCreatedCompanyId] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const getCategories = async () => {
    const response = await fetch(CategoryApiRoutes.GetCategoreies);
    if (!response.ok) {
      const error = await response.text();
      showErrorMessage(error);
      return;
    }
    const categoriesList = await response.json();
    setCategories(categoriesList);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Stepper activeStep={activeStep} style={styles.stepper}>
        <Step>
          <StepLabel>Create Company</StepLabel>
        </Step>
        <Step>
          <StepLabel>Sign Up</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <CreateCompany
          activeStep={activeStep}
          categories={categories}
          onCompanyCreate={(companyId: number) => {
            setCreatedCompanyId(companyId);
          }}
          handleNext={handleNext}
        />
      )}
      {activeStep === 1 && <AddVendor companyId={createdCompanyId} />}
    </>
  );
};
