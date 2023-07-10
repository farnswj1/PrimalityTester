import { FC } from 'react';
import {
  Box,
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider
} from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      <Box marginY={5}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PrimalityTestPage} />
            <Route exact path="*" component={PageNotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
