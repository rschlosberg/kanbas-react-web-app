import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Kanbas from "../Kanbas";
export default function Labs() {
  return (
    <div>
      <h1>Rachael Schlosberg</h1>
      <h3>CS 5610 | Web Development | Section: 03 | CRN: 20596 | Online</h3>

      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Kanbas" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
