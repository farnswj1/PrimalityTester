import { Fragment, type FC, type PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import { Footer } from "~/layouts";

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <Stack
      component="main"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        height: "100%",
        p: 2,
      }}
    >
      {children}
    </Stack>
    <Footer />
  </Fragment>
);

export default CenteredLayout;