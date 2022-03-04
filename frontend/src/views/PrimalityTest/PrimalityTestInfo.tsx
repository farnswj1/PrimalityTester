import React, { FC, MouseEventHandler } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Link
} from '@mui/material';

interface Props {
  open: boolean,
  onClose: MouseEventHandler
};

const PrimalityTestInfo: FC<Props> = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="primality-test-info"
    aria-describedby="primality-test-info"
  >
    <DialogContent>
      <Box sx={{ mb: 3 }}>
        <DialogContentText variant="h5">What is a prime?</DialogContentText>
        <DialogContentText>
          A prime is an integer greater than 1 that is divisible only by 1 and itself.
          For example: 7 is a prime since its only factors are 1 and 7. However,
          9 is not a prime since its factors are 1, 3, and 9.
        </DialogContentText>
      </Box>
      <Box sx={{ mb: 3 }}>
        <DialogContentText variant="h5">Why do we care?</DialogContentText>
        <DialogContentText>
          Aside from being an interesting mathematical property, it is used in
          cybersecurity, where primes play an integral role in cryptography.
          Cryptosystems, such
          as <Link href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">RSA</Link>,
          and key exchanges, such
          as <Link href="https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange">
            Diffie-Hellman
          </Link>, depend on it.
        </DialogContentText>
      </Box>
      <Box sx={{ mb: 3 }}>
        <DialogContentText variant="h5">How do we check if it's prime?</DialogContentText>
        <DialogContentText sx={{ mb: 3 }}>
          One such way is to exhaustively check every number between 1 and itself
          (non-inclusive) to see if any of them divide the number. If any do, then
          it is not prime, or composite. While this is guaranteed to work, it is
          very inefficient, especially if the number is very large.
        </DialogContentText>
        <DialogContentText>
          Fortunately, there are primality tests that are much more efficient, but
          they aren't 100% accurate. For example,
          the <Link href="https://en.wikipedia.org/wiki/Fermat_primality_test">
            Fermat primality test
          </Link> is much faster than using a brute-force method, but it doesn't
          guarantee primality. Another test is
          the <Link href="https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test">
            Miller-Rabin primality test
          </Link>, which is very good at finding primes, although very few composite
          numbers pass this test.
        </DialogContentText>
      </Box>
      <Box>
        <DialogContentText variant="h5">What does this test use?</DialogContentText>
        <DialogContentText>
          This test uses the Miller-Rabin primality test as well as
          the <Link href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes">
            Sieve of Eratosthenes
          </Link>. The latter generates a list of primes under a given input number,
          which makes testing primes less than the input to be quick. In this case,
          we chose 1 million. We can test numbers larger than or equal to 1 million
          by checking if the number is divisible by any prime in the list. If not,
          then we use the Miller-Rabin primality test, which uses all primes under 
          100 as the candidate primes. If the number passes all of these tests, then
          the number is considered to be prime.
        </DialogContentText>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default PrimalityTestInfo;
