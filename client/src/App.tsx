import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormHome } from "./FormHome"
import { Form } from "./Form"
import { Status } from "./Status"
import { Header } from "./Header"
import { FormResult } from "./FormResult"

import "./App.css"

window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () =>
    <>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormHome />} />
                <Route path="/form" element={<Form />} />
                <Route path="/form/result" element={<FormResult />} />
                <Route path="/status" element={<Status />} />
            </Routes>
        </BrowserRouter>
    </>

export default App