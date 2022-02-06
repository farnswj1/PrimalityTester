import React from 'react';
import { Paper, Box, Typography, Link } from '@mui/material';

const PrimalityTestInfo = () => (
  <Paper square={false} sx={{ p: 2 }}>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5">What is a prime?</Typography>
      <Typography>
        A prime is an integer greater than 1 that is divisible only by 1 and itself.
        For example: 7 is a prime since its only factors are 1 and 7. However,
        9 is not a prime since its factors are 1, 3, and 9.
      </Typography>
    </Box>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5">Why do we care?</Typography>
      <Typography>
        Aside from being an interesting mathematical property, it is used in
        cybersecurity, where primes play an integral role in cryptography.
        Cryptosystems, such
        as <Link href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">RSA</Link>,
        and key exchanges, such
        as <Link href="https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange">
          Diffie-Hellman
        </Link>, depend on it.
      </Typography>
    </Box>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5">How do we check if it's prime?</Typography>
      <Typography sx={{ mb: 3 }}>
        One such way is to exhaustively check every number between 1 and itself
        (non-inclusive) to see if any of them divide the number. If any do, then
        it is not prime, or composite. While this is guaranteed to work, it is
        very inefficient, especially if the number is very large.
      </Typography>
      <Typography>
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
      </Typography>
    </Box>
    <Box>
      <Typography variant="h5">What does this test use?</Typography>
      <Typography>
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
      </Typography>
    </Box>
  </Paper>
);

export default PrimalityTestInfo;
