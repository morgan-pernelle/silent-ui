import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SilentProvider, ToastProvider } from "@silent-ui/react";
import { ScrollToTop } from "./layout/ScrollToTop";
import { SiteLayout } from "./layout/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { InstallPage } from "./pages/InstallPage";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { AboutPage } from "./pages/AboutPage";
import { RecipesPage } from "./pages/RecipesPage";

export function App() {
  return (
    <SilentProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="docs/install" element={<InstallPage />} />
              <Route path="docs/getting-started" element={<GettingStartedPage />} />
              <Route path="docs/components" element={<ComponentsPage />} />
              <Route path="docs/recipes" element={<RecipesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </SilentProvider>
  );
}
