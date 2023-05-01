import { useMediaQuery, useTheme } from "@mui/material";

export const useIsDesktop = () => {
  const theme = useTheme();
  const isComputer = useMediaQuery(theme.breakpoints.up("sm"));

  return isComputer;
}
