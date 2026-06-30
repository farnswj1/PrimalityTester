import { type FC, type SubmitEvent, useState } from "react";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { APIService } from "~/services";
import PrimalityTestForm from "./PrimalityTestForm";
import PrimalityTestInfo from "./PrimalityTestInfo";
import { useFetch } from "~/hooks";

const getAlertMessage = (status: number | null): string | null => {
  switch (status) {
    case null:
    case 200:
      return null;
    case 400:
      return "Please enter a number.";
    case 429:
      return "Max limit exceeded! Please wait 1 minute.";
    default:
      return "There is an issue with the server!";
  }
};

const PrimalityTestPage: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [{ loading, status, data: result }, dispatch] = useFetch<boolean>();
  const alertMessage = getAlertMessage(status);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch({ type: "pending" });

    const data: FormData = new FormData(event.currentTarget);
    const params: URLSearchParams = new URLSearchParams(
      data as unknown as Record<string, string>
    );

    APIService.isPrime(Number(params.get("number")!.trim()))
      .then((response) => dispatch({ type: "result", response }))
      .catch((error: unknown) => dispatch({ type: "error", error }));
  };

  const openHelpModal = (): void => {
    setOpenModal(true);
  };

  const closeHelpModal = (): void => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="sm">
      <PrimalityTestForm
        handleSubmit={handleSubmit}
        openModal={openHelpModal}
        disabled={loading}
      />
      <Box sx={{ textAlign: "center", marginY: 5 }}>
        {
          loading && (
            <LinearProgress color="info" />
          )
        }
        {
          alertMessage && (
            <Typography variant="h5" color="error">
              {alertMessage}
            </Typography>
          )
        }
        {
          result !== null && (
            <Typography variant="h5">
              {result ? "Prime" : "Not Prime"}
            </Typography>
          )
        }
      </Box>
      <PrimalityTestInfo
        open={openModal}
        onClose={closeHelpModal}
      />
    </Container>
  );
}

export default PrimalityTestPage;
