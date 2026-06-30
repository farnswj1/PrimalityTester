import {
  type ChangeEvent,
  type FC,
  type SubmitEventHandler,
  type MouseEventHandler,
  useState
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
  handleSubmit: SubmitEventHandler<HTMLFormElement>;
  openModal: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  result: boolean | null;
  errorMessage: string | null;
}

const PrimalityTestForm: FC<PrimalityTestFormProps> = ({
  handleSubmit,
  openModal,
  disabled,
  result,
  errorMessage
}) => {
  const [error, setError] = useState<boolean>(false);
  const [formChanged, setFormChanged] = useState<boolean>(false);

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const number: string = event.target.value.trim();
    const intRegex: RegExp = /^([2-9]|[1-9][0-9]+)$/;
    setError(!intRegex.test(number));

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
