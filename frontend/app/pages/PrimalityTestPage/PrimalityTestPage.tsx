import { type FC } from "react";
import { Container } from "@mui/material";
import { APIService } from "~/services";
import { useFetch } from "~/hooks";
import PrimalityTestForm from "./PrimalityTestForm";

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
  const [{ loading, status, data: result }, dispatch] = useFetch<boolean>();
  const alertMessage = getAlertMessage(status);

  const handleSubmit = (number: string): void => {
    dispatch({ type: "pending" });

    APIService.isPrime(BigInt(number))
      .then((response) => dispatch({ type: "result", response }))
      .catch((error: unknown) => dispatch({ type: "error", error }));
  };

  return (
    <Container maxWidth="sm">
      <PrimalityTestForm
        onSubmit={handleSubmit}
        disabled={loading}
        result={result}
        errorMessage={alertMessage}
      />
    </Container>
  );
}

export default PrimalityTestPage;
