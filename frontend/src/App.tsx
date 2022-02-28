import React, { FC } from 'react';
import { Container, createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrimalityTest from 'views/PrimalityTest';
import Footer from 'components/Footer';
import Error404 from 'views/Error404';

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
      <Container sx={{ my: 5 }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PrimalityTest} />
            <Route exact path="*" component={Error404} />
          </Switch>
        </BrowserRouter>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
