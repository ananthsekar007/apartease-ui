import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface HeaderProps {
  text: string;
}

type Props = HeaderProps & Partial<TypographyProps>;
export function UIHeading(props: Props) {
  return (
    <Typography variant="h5" color="textPrimary" {...props}>
      {props.text}
    </Typography>
  );
}
