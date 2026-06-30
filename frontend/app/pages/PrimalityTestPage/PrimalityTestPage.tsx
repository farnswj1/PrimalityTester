import { type FC, type SubmitEvent, useState } from "react";
import { Container } from "@mui/material";
import { APIService } from "~/services";
import { useFetch } from "~/hooks";
import PrimalityTestForm from "./PrimalityTestForm";
import PrimalityTestInfo from "./PrimalityTestInfo";

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
    const number: string = data.get("number") as string;

    APIService.isPrime(BigInt(number))
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
        result={result}
        errorMessage={alertMessage}
      />
      <PrimalityTestInfo
        open={openModal}
        onClose={closeHelpModal}
      />
    </Container>
  );
}

export default PrimalityTestPage;
