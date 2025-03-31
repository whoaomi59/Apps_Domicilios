import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestReset from "./view/auth/RequestReset";
import ResetPassword from "./view/auth/ResetPassword";
import Login from "./view/auth/Login";
import Dashboard from "./view/admin/Dashboard";
import Empresas from "./view/admin/empresa/Empresas";
import PrivateRoute from "./midelware/PrivateRoute";
import { AuthProvider } from "./auth/AuthContext";
import Container from "./components/layouts/container";
import Home from "./view/home";
import Usuarios from "./view/admin/usuarios";
import Negocios from "./view/admin/negocios";
import Productos from "./view/admin/productos";
import axios from "axios";
import NegociosShop from "./view/Shop/Negocios";
import { useEffect, useState } from "react";
import NavbarShop from "./view/Shop/navbar";
import ProductosShop from "./view/Shop/Productos";
import { jwtDecode } from "jwt-decode"; // ✅ Forma correcta
import PedidosShop from "./view/Shop/Pedidos";
import Car_Shop from "./view/Shop/car_shop";
import Detalle_Pedido from "./view/Shop/detalle_pedido";

function App() {
  const [Rol, setRol] = useState(null);
  const [IdUser, setIdUser] = useState(null);
  const [empresa, setEmpresa] = useState({});

  axios.defaults.baseURL = "http://localhost/API/";

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtiene el token
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setIdUser(decoded.id);
        setRol(decoded.rol); // ✅ Se actualiza solo una vez
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    const Get = async () => {
      try {
        const response = await axios.get("/api/empresas/controller.php");
        setEmpresa(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* AUTENTICACIÓN */}
          <Route path="/login" element={<Login />} />
          <Route path="/request-reset" element={<RequestReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />

          {/* RUTAS PRIVADAS */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Container Roles={Rol}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/empresas" element={<Empresas />} />
                    <Route
                      path="/negocios"
                      element={<Negocios IdUser={IdUser} Roles={Rol} />}
                    />
                    <Route path="/productos" element={<Productos />} />
                  </Routes>
                </Container>
              </PrivateRoute>
            }
          />
          <Route
            path="/shop/*"
            element={
              <>
                <NavbarShop logo={empresa.logo} />
                <Routes>
                  <Route path="/negocios" element={<NegociosShop />} />
                  <Route
                    path="/productos/:id/:name"
                    element={<ProductosShop />}
                  />
                  <Route path="/car_shop" element={<Car_Shop />} />
                  <Route path="/pedidos" element={<PedidosShop />} />
                  <Route
                    path="/pedidos/detalle/:id"
                    element={
                      <Detalle_Pedido
                        logo={empresa.logo}
                        empresa={empresa.nombre}
                      />
                    }
                  />
                </Routes>
              </>
            }
          />

          {/* Página No Encontrada */}
          <Route path="*" element={<h1>No Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
