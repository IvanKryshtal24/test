import {
  Refine,
  GitHubBanner,
  WelcomePage,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import dataProvider, { GraphQLClient } from "@refinedev/graphql";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routerBindings, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import Account from './components/Account';

const API_URL = "https://api.github.com/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer token`,
  }
});
const gqlDataProvider = dataProvider(client);

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={gqlDataProvider}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "CC9xjD-REe0DD-OQ5VOM",
                }}
              >
                <Routes>
                  <Route index element={<WelcomePage />} />
                  <Route path="/account" element={<Account />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
