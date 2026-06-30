import { type FC } from "react";
import { Link } from "react-router";
import { Button, Container, Stack, Typography } from "@mui/material";
import { CustomPaper } from "~/components";

const PageNotFoundPage: FC = () => (
  <Container maxWidth="md">
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CustomPaper>
        <Typography variant="h4">
          Page Not Found
        </Typography>
        <Typography component="p" sx={{ marginBottom: 3 }}>
          Fun fact: 404 is not prime. Also, it's a code for "this page doesn't exist".
        </Typography>
        <Button component={Link} variant="contained" to="/">
          Go Home
        </Button>
      </CustomPaper>
    </Stack>
  </Container>
);

export default PageNotFoundPage;
