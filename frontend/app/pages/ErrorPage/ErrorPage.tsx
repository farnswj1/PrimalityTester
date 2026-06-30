import { type FC } from "react";
import { Link } from "react-router";
import { Button, Container, Stack, Typography } from "@mui/material";
import { CustomPaper } from "~/components";

const ErrorPage: FC = () => (
  <Container maxWidth="md">
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CustomPaper>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Oops!
        </Typography>
        <Typography component="p" sx={{ marginBottom: 2 }}>
          Looks like something went wrong.
        </Typography>
        <Button component={Link} variant="contained" to="/">
          Go Home
        </Button>
      </CustomPaper>
    </Stack>
  </Container>
);

export default ErrorPage;
