import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import EmployeeForm from "./EmployeeForm.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route
            path="*"
            element={<p className="text-center text-muted">Page not found.</p>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
