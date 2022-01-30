import React from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container,  } from '@mui/material';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrimalityTest from './views/PrimalityTest';
import Error404 from './views/Error404';

const App = () => {
  const theme = createTheme({});
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
    </ThemeProvider>
  );
};

export default App;
