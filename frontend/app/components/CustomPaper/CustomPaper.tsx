import { type FC } from "react";
import { Paper, type PaperProps } from "@mui/material";

const CustomPaper: FC<PaperProps> = (props) => (
  <Paper square={false} sx={{ p: 2 }} {...props} />
);

export default CustomPaper;
