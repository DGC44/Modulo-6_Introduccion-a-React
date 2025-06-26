// Paso 4.
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home.jsx"

// Paso 3. Definir rutas. Lo que buscara routes touter
export default function RoutesIndex() {


    return (
        <Routes>
            {/* <Route path="/direccion" element={<Pagina />} */}
            <Route path={<Home />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/dynamic" element={<Dynamic/>} />


        </Routes>
    );
}