import { type FC } from "react";
import { Box, Typography } from "@mui/material";

const year: number = new Date().getFullYear();

const Footer: FC = () => (
  <Box component="footer" sx={{ padding: 2, marginTop: "auto" }}>
    <Typography variant="body2" align="center">
      &copy; {year} Justin Farnsworth. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
