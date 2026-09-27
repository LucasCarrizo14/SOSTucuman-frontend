import { useState } from 'react';
import { Modal, Button, Form, Tabs, Tab, Alert } from 'react-bootstrap';

export default function AuthModal({ show, onHide }) {
    // Estado para saber en qué pestaña estamos
    const [tabActiva, setTabActiva] = useState('login');

    // Estado para los errores visuales
    const [error, setError] = useState('');

    // Estados para los campos de los formularios
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Función de validación de email (igual a tu script original)
    const esEmailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

    // Manejador del Login
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!esEmailValido(email)) {
            setError('Ingresá un correo electrónico válido.');
            return;
        }
        if (password.trim().length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres.');
            return;
        }

        // Lógica original: Simular nombre con lo que está antes del @
        const nombreSimulado = email.split('@')[0];

        // Guardar en localStorage
        localStorage.setItem("sostucumanNombre", nombreSimulado);
        localStorage.setItem("sostucumanEmail", email.trim());

        // Avisar al Navbar que el usuario ingresó
        window.dispatchEvent(new Event("usuarioActualizado"));

        // Cerrar el modal
        onHide();
        limpiarFormulario();
    };

    // Manejador del Registro
    const handleRegistro = (e) => {
        e.preventDefault();
        setError('');

        if (nombre.trim().length < 3) {
            setError('Ingresá tu nombre completo.');
            return;
        }
        if (!esEmailValido(email)) {
            setError('Ingresá un correo electrónico válido.');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (confirmPassword !== password || confirmPassword === '') {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Guardar en localStorage
        localStorage.setItem("sostucumanNombre", nombre.trim());
        localStorage.setItem("sostucumanEmail", email.trim());

        // Avisar al Navbar
        window.dispatchEvent(new Event("usuarioActualizado"));

        // Cerrar el modal
        onHide();
        limpiarFormulario();
    };

    // Limpia los campos cuando se cierra el modal
    const limpiarFormulario = () => {
        setEmail('');
        setPassword('');
        setNombre('');
        setConfirmPassword('');
        setError('');
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
                {error && <Alert variant="danger" className="py-2 text-center">{error}</Alert>}

                <Tabs
                    activeKey={tabActiva}
                    onSelect={(k) => setTabActiva(k)}
                    className="mb-4 nav-fill"
                >
                    {/* PESTAÑA LOGIN */}
                    <Tab eventKey="login" title={<span className="fw-semibold">Iniciar sesión</span>}>
                        <Form onSubmit={handleLogin} noValidate>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="vos@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="btn-primary w-100 mt-2 rounded-3 fw-bold">
                                Ingresar
                            </Button>
                        </Form>
                    </Tab>

                    {/* PESTAÑA REGISTRO */}
                    <Tab eventKey="registro" title={<span className="fw-semibold">Registrarse</span>}>
                        <Form onSubmit={handleRegistro} noValidate>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Nombre y apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Sofía Pérez"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="form-input"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="vos@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Repetir contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-input"
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="btn-primary w-100 mt-2 rounded-3 fw-bold">
                                Crear cuenta
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}