import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface CustomProps {
  loading?: boolean;
}

export function UIButton(props: CustomProps & Partial<ButtonProps>) {
  const { loading, ...rest } = props;
  return (
    <Button
      color="primary"
      variant={props.variant || "contained"}
      startIcon={loading ? <CircularProgress size={15} /> : ""}
      {...rest}
      style={{
        height: "fit-content",
      }}
      disabled={loading || props.disabled}
    >
      {props.children}
    </Button>
  );
}