import { FC } from 'react';
import {
  Box,
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider
} from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from 'layouts';
import { PageNotFoundPage, PrimalityTestPage } from 'pages';

const App: FC = () => {
  const theme: Theme = createTheme({
    palette: {
      background: {
        default: '#f5f5dc'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" marginY={5}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrimalityTestPage />} />
            <Route path="*" element={<PageNotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
