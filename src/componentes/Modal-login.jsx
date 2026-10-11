import { useState } from 'react';
import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

// Utilizamos la variable de entorno como pide el TP
const API_URL = import.meta.env.VITE_API_URL;

export default function AuthModal({ show, onHide }) {
    const [tabActiva, setTabActiva] = useState('login');

    // Estados para los campos de los formularios
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const esEmailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

    // --- LÓGICA DE INICIO DE SESIÓN CON AXIOS ---
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!esEmailValido(email) || password.trim().length < 4) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'Por favor, revisá tu correo y contraseña.'
            });
            return;
        }

        try {
            // Petición GET con Axios
            const response = await axios.get(`${API_URL}/usuarios?email=${email}`);
            const usuarioEncontrado = response.data[0];

            if (usuarioEncontrado && usuarioEncontrado.password === password) {
                // Guardar en localStorage
                localStorage.setItem("sostucumanNombre", usuarioEncontrado.nombre);
                localStorage.setItem("sostucumanEmail", usuarioEncontrado.email);
                
                // Avisar al Navbar que el usuario ingresó
                window.dispatchEvent(new Event("usuarioActualizado"));
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: `Hola de nuevo, ${usuarioEncontrado.nombre}`,
                    timer: 2000,
                    showConfirmButton: false
                });

                onHide();
                limpiarFormulario();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de credenciales',
                    text: 'El correo o la contraseña son incorrectos.'
                });
            }
        } catch (error) {
            // Manejo de errores con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'No pudimos conectarnos a la base de datos.'
            });
        }
    };

    // --- LÓGICA DE REGISTRO CON AXIOS ---
    const handleRegistro = async (e) => {
        e.preventDefault();

        if (nombre.trim().length < 3 || !esEmailValido(email) || password.length < 6 || confirmPassword !== password) {
            Swal.fire({
                icon: 'warning',
                title: 'Revisá tus datos',
                text: 'Asegurate de completar todo correctamente y que las contraseñas coincidan.'
            });
            return;
        }

        try {
            // 1. Verificar si el correo ya existe (GET)
            const checkUser = await axios.get(`${API_URL}/usuarios?email=${email}`);
            if (checkUser.data.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo en uso',
                    text: 'Este correo electrónico ya está registrado en el sistema.'
                });
                return;
            }

            // 2. Si no existe, crear el usuario (POST)
            const nuevoUsuario = {
                nombre: nombre.trim(),
                email: email.trim(),
                password: password
            };

            await axios.post(`${API_URL}/usuarios`, nuevoUsuario);

            // Loguear automáticamente después de registrar
            localStorage.setItem("sostucumanNombre", nuevoUsuario.nombre);
            localStorage.setItem("sostucumanEmail", nuevoUsuario.email);
            window.dispatchEvent(new Event("usuarioActualizado"));

            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Te has registrado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });

            onHide();
            limpiarFormulario();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'Hubo un problema al crear tu cuenta. Intentá más tarde.'
            });
        }
    };

    const limpiarFormulario = () => {
        setEmail('');
        setPassword('');
        setNombre('');
        setConfirmPassword('');
    };

    return (
        <Modal
            show={show}
            onHide={() => { onHide(); limpiarFormulario(); }}
            centered
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title style={{ fontFamily: 'Outfit', fontWeight: 800, color: '#082f49' }}>
                    Tu cuenta SosTucumán
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 pb-4">
                <Tabs activeKey={tabActiva} onSelect={(k) => setTabActiva(k)} className="mb-4 nav-fill">
                    <Tab eventKey="login" title={<span className="fw-semibold">Iniciar sesión</span>}>
                        <Form onSubmit={handleLogin} noValidate>
                            {/* ... Campos de Login (igual que los tenías) ... */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Correo electrónico</Form.Label>
                                <Form.Control type="email" placeholder="vos@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="btn-primary w-100 mt-2 rounded-3 fw-bold">Ingresar</Button>
                        </Form>
                    </Tab>

                    <Tab eventKey="registro" title={<span className="fw-semibold">Registrarse</span>}>
                        <Form onSubmit={handleRegistro} noValidate>
                            {/* ... Campos de Registro (igual que los tenías) ... */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Nombre y apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Sofía Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Correo electrónico</Form.Label>
                                <Form.Control type="email" placeholder="vos@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Repetir contraseña</Form.Label>
                                <Form.Control type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="btn-primary w-100 mt-2 rounded-3 fw-bold" style={{ backgroundColor: "#f97316", border: "none" }}>Crear cuenta</Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}