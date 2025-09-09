import { Route, Routes } from "react-router-dom";
import "./App.module.css";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() =>
  import("../../pages/CatalogPage/CatalogPage.jsx")
);
const DetailsPage = lazy(() =>
  import("../../pages/DetailsPage/DetailsPage.jsx")
);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
