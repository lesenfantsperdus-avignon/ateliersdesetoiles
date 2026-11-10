import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { AuthCallback } from "@/components/admin/AuthCallback";
import { ContentProvider } from "@/context/ContentContext";
import Home from "@/pages/Home";
import Association from "@/pages/Association";
import Ateliers from "@/pages/Ateliers";
import Projets from "@/pages/Projets";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function Shell() {
  const location = useLocation();
  if (location.hash?.includes("session_id=")) return <AuthCallback />;
  if (location.pathname.startsWith("/admin")) return <Admin />;
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/association" element={<Association />} />
          <Route path="/ateliers" element={<Ateliers />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Shell />
      </ContentProvider>
      <Toaster position="bottom-center" toastOptions={{ style: { fontFamily: "Instrument Sans", background: "#0B132B", color: "#F4EEE3", border: "none" } }} />
    </BrowserRouter>
  );
}

export default App;
