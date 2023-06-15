import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormHome } from "./FormHome"
import { Form } from "./Form"
import { Status } from "./Status"
import { Header } from "./Header"

import "./App.css"

const App = () =>
    <>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/form" element={<FormHome />} />
                <Route path="/form/:code" element={<Form />} />
                <Route path="/status" element={<Status />} />
            </Routes>
        </BrowserRouter>
    </>

export default App