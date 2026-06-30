import {
  type ChangeEvent,
  type FC,
  type MouseEventHandler,
  useState,
  type SubmitEvent
} from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { CustomPaper } from "~/components";

interface PrimalityTestFormProps {
  openModal: MouseEventHandler<HTMLButtonElement>;
  onSubmit: (number: string) => void;
  disabled: boolean;
  result: boolean | null;
  errorMessage: string | null;
}

const INTEGER_REGEX: RegExp = /^([2-9]|[1-9][0-9]+)$/;

const PrimalityTestForm: FC<PrimalityTestFormProps> = ({
  openModal,
  onSubmit,
  disabled,
  result,
  errorMessage
}) => {
  const [number, setNumber] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [formChanged, setFormChanged] = useState<boolean>(false);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(number);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const number: string = event.target.value.trim();
    setNumber(number);
    setError(!INTEGER_REGEX.test(number));

    if (!formChanged) {
      setFormChanged(true);
    }
  };

  return (
    <CustomPaper>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">
          Is It Prime?
        </Typography>
        <Tooltip title="Click this icon for more information on primes.">
          <IconButton onClick={openModal}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField
          id="number"
          name="number"
          label="Enter an integer greater than 1"
          variant="outlined"
          rows={8}
          slotProps={{ inputLabel: { required: false }}}
          value={number}
          onChange={handleNumberChange}
          disabled={disabled}
          error={error}
          multiline
          fullWidth
          required
        />
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={error || !formChanged || disabled}
          >
            Submit
          </Button>
          {
            disabled && (
              <CircularProgress size={24} color="info" aria-label="Loading..." />
            )
          }
          {
            errorMessage && (
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            )
          }
          {
            result !== null && (
              <Typography variant="h6">
                {result ? "Prime" : "Not Prime"}
              </Typography>
            )
          }
        </Stack>
      </Stack>
    </CustomPaper>
  );
};

export default PrimalityTestForm;
