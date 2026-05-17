import { useState } from 'react';
import './login.css';

/**
 * Login - Sistema de Gestión de Agremiados
 * Layout split screen: formulario izquierda + visual con gradient derecha
 *
 * INSTALACIÓN:
 *   npm install @tabler/core @tabler/icons-webfont
 *
 * En main.jsx:
 *   import '@tabler/core/dist/css/tabler.min.css';
 *   import '@tabler/icons-webfont/dist/tabler-icons.min.css';
 *   import '@tabler/core/dist/js/tabler.min.js';
 *
 * Importa también el archivo login.css (incluido al final como string)
 * o pega los estilos en tu CSS global.
 */

const loginStyles = `
  :root {
    --brand-primary: #1e40af;
    --brand-secondary: #3b82f6;
    --brand-accent: #06b6d4;
  }

  .login-page {
    min-height: 100vh;
    display: flex;
    background: #f8fafc;
  }
  .login-form-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: #fff;
  }
  .login-visual-side {
    flex: 1;
    position: relative;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    color: #fff;
  }

  @media (max-width: 991.98px) {
    .login-visual-side { display: none; }
  }

  .login-form-container {
    width: 100%;
    max-width: 420px;
  }
  .brand-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 24px;
    box-shadow: 0 8px 24px rgba(30, 64, 175, 0.25);
  }
  .form-control-lg {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
  .input-icon .form-control-lg { padding-left: 2.75rem; }
  .input-icon-addon { font-size: 1.1rem; }
  .btn-login {
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
    border: none;
    padding: 0.75rem 1rem;
    font-weight: 500;
    box-shadow: 0 4px 14px rgba(30, 64, 175, 0.3);
    transition: all 0.2s;
    color: #fff;
  }
  .btn-login:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);
    color: #fff;
  }

  .visual-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.08;
    background-image:
      radial-gradient(circle at 20% 30%, #fff 0, transparent 40%),
      radial-gradient(circle at 80% 70%, #fff 0, transparent 50%);
  }
  .visual-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .visual-content { position: relative; z-index: 2; }

  .stat-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 1rem 1.25rem;
  }

  .floating-card {
    position: absolute;
    background: rgba(255, 255, 255, 0.95);
    color: #1f2937;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: float 6s ease-in-out infinite;
    z-index: 3;
  }
  .floating-card-1 { top: 22%; right: 8%; animation-delay: 0s; }
  .floating-card-2 { top: 48%; left: 6%; animation-delay: 2s; }
  .floating-card-3 { bottom: 24%; right: 12%; animation-delay: 4s; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .floating-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #fff;
  }

  .form-check-input:checked {
    background-color: var(--brand-primary);
    border-color: var(--brand-primary);
  }

  .link-brand {
    color: var(--brand-primary);
    font-weight: 500;
    text-decoration: none;
  }
  .link-brand:hover { text-decoration: underline; }

  .password-toggle-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.375rem;
    background: transparent;
    border: none;
    color: var(--tblr-secondary);
    z-index: 5;
  }
`;

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    rememberMe: true,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.usuario.trim()) {
      newErrors.usuario = 'Ingresa tu correo o N° de colegiatura';
    }
    if (!formData.password) {
      newErrors.password = 'Ingresa tu contraseña';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // TODO: reemplazar con llamada real a tu API Spring Boot
      // const res = await axios.post('/api/auth/login', {
      //   usuario: formData.usuario,
      //   password: formData.password,
      //   rememberMe: formData.rememberMe,
      // });
      // localStorage.setItem('token', res.data.token);
      // navigate('/dashboard');

      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Login exitoso. Aquí redirigirías al dashboard.');
    } catch (err) {
      setErrors({ general: 'Credenciales inválidas. Verifica tus datos.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      

      <div className="login-page">
        {/* ============ LADO IZQUIERDO: FORMULARIO ============ */}
        <div className="login-form-side">
          <div className="login-form-container">
            {/* Logo y título */}
            <div className="mb-4">
              <div className="brand-logo mb-3">
                <i className="ti ti-award"></i>
              </div>
              <h1 className="h2 mb-1" style={{ fontWeight: 600 }}>
                Bienvenido de vuelta
              </h1>
              <p className="text-secondary">
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>

            {/* Alerta de error general */}
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                <i className="ti ti-alert-circle me-1"></i>
                {errors.general}
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              {/* Usuario */}
              <div className="mb-3">
                <label className="form-label">
                  Correo electrónico o N° de colegiatura
                </label>
                <div className="input-icon">
                  <span className="input-icon-addon">
                    <i className="ti ti-user"></i>
                  </span>
                  <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${
                      errors.usuario ? 'is-invalid' : ''
                    }`}
                    placeholder="correo@colegio.pe"
                    autoComplete="username"
                  />
                </div>
                {errors.usuario && (
                  <div className="invalid-feedback d-block">
                    {errors.usuario}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label d-flex justify-content-between">
                  <span>Contraseña</span>
                  <a
                    href="#"
                    className="link-brand small"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowRecoverModal(true);
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </label>
                <div className="input-icon" style={{ position: 'relative' }}>
                  <span className="input-icon-addon">
                    <i className="ti ti-lock"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`}></i>
                  </button>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Recordarme */}
              <div className="mb-4">
                <label className="form-check">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <span className="form-check-label">
                    Recordar mi sesión por 30 días
                  </span>
                </label>
              </div>

              {/* Botón principal */}
              <button
                type="submit"
                className="btn btn-lg w-100 btn-login mb-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Verificando...
                  </>
                ) : (
                  <>
                    Iniciar sesión
                    <i className="ti ti-arrow-right ms-1"></i>
                  </>
                )}
              </button>

              {/* Separador */}
              <div className="hr-text my-4">o continúa con</div>

              {/* Métodos alternativos */}
              <div className="row g-2">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                  >
                    <i className="ti ti-fingerprint me-1"></i>
                    Biométrico
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                  >
                    <i className="ti ti-id me-1"></i>
                    DNI + RENIEC
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center mt-4 text-secondary small">
              ¿Aún no eres agremiado?{' '}
              <a href="#" className="link-brand">
                Solicita tu colegiatura aquí
              </a>
            </div>
          </div>
        </div>

        {/* ============ LADO DERECHO: VISUAL ============ */}
        <div className="login-visual-side">
          <div className="visual-pattern"></div>
          <div className="visual-grid"></div>

          {/* Header */}
          <div className="visual-content">
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <i className="ti ti-award" style={{ fontSize: 22 }}></i>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  SisColegio
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  Plataforma de Gestión Profesional
                </div>
              </div>
            </div>
          </div>

          {/* Centro: mensaje + ilustración */}
          <div
            className="visual-content text-center"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '2rem 0',
            }}
          >
            <svg
              viewBox="0 0 400 280"
              style={{ maxWidth: 380, width: '100%', margin: '0 auto 2rem' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="140" r="120" fill="rgba(255,255,255,0.08)" />
              <circle cx="200" cy="140" r="90" fill="rgba(255,255,255,0.06)" />

              <g transform="translate(120, 70)">
                <rect x="0" y="0" width="160" height="140" rx="12" fill="#fff" opacity="0.95" />
                <rect x="0" y="0" width="160" height="40" rx="12" fill="#1e40af" />
                <rect x="0" y="28" width="160" height="12" fill="#1e40af" />

                <circle cx="80" cy="60" r="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="80" cy="55" r="6" fill="#3b82f6" />
                <path d="M 65 72 Q 80 80 95 72 L 95 78 L 65 78 Z" fill="#3b82f6" />

                <rect x="30" y="92" width="100" height="6" rx="3" fill="#e5e7eb" />
                <rect x="40" y="104" width="80" height="4" rx="2" fill="#e5e7eb" />
                <rect x="50" y="114" width="60" height="4" rx="2" fill="#e5e7eb" />

                <circle cx="135" cy="120" r="12" fill="#10b981" opacity="0.9" />
                <path
                  d="M 130 120 L 134 124 L 140 116"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <g fill="#fff" opacity="0.6">
                <circle cx="60" cy="60" r="3" />
                <circle cx="340" cy="80" r="2" />
                <circle cx="80" cy="220" r="2.5" />
                <circle cx="330" cy="210" r="3" />
                <circle cx="40" cy="160" r="1.5" />
                <circle cx="360" cy="150" r="2" />
              </g>

              <path
                d="M 30 30 L 50 30 M 40 20 L 40 40"
                stroke="#fff"
                strokeWidth="1.5"
                opacity="0.5"
                strokeLinecap="round"
              />
              <path
                d="M 350 240 L 370 240 M 360 230 L 360 250"
                stroke="#fff"
                strokeWidth="1.5"
                opacity="0.5"
                strokeLinecap="round"
              />
            </svg>

            <h2 style={{ fontWeight: 600, fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              Gestión profesional simplificada
            </h2>
            <p style={{ opacity: 0.9, fontSize: '1rem', maxWidth: 380, margin: '0 auto' }}>
              Administra agremiados, pagos, capacitaciones y certificaciones
              desde una plataforma integral diseñada para tu colegio profesional.
            </p>
          </div>

          {/* Tarjetas flotantes */}
          <div className="floating-card floating-card-1">
            <div className="floating-icon" style={{ background: '#10b981' }}>
              <i className="ti ti-shield-check"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                Certificación válida
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                Verificación digital QR
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-2">
            <div className="floating-icon" style={{ background: '#3b82f6' }}>
              <i className="ti ti-users"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                2,847 agremiados
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                Crecimiento +3.2%
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-3">
            <div className="floating-icon" style={{ background: '#f59e0b' }}>
              <i className="ti ti-trending-up"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                S/ 156,840
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                Recaudación mensual
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="visual-content">
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="stat-card">
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>9</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    Módulos integrados
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>24/7</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    Disponibilidad
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card">
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>SSL</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    Conexión segura
                  </div>
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-between align-items-center"
              style={{ fontSize: '0.8rem', opacity: 0.85 }}
            >
              <span>© 2026 SisColegio · Todos los derechos reservados</span>
              <div className="d-flex gap-3">
                <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.85 }}>
                  Términos
                </a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.85 }}>
                  Privacidad
                </a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.85 }}>
                  Soporte
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MODAL: RECUPERAR CONTRASEÑA ============ */}
      {showRecoverModal && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowRecoverModal(false)}
          ></div>
          <div
            className="modal fade show"
            style={{ display: 'block' }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Recuperar contraseña</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowRecoverModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-secondary mb-3">
                    Ingresa tu correo electrónico registrado o número de
                    colegiatura y te enviaremos las instrucciones para
                    restablecer tu contraseña.
                  </p>
                  <div className="mb-3">
                    <label className="form-label">
                      Correo o N° de colegiatura
                    </label>
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <i className="ti ti-mail"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="correo@colegio.pe"
                      />
                    </div>
                  </div>
                  <div className="alert alert-info mb-0" role="alert">
                    <i className="ti ti-info-circle me-1"></i>
                    Recibirás un enlace seguro válido por 1 hora.
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-link link-secondary"
                    onClick={() => setShowRecoverModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary">
                    <i className="ti ti-send me-1"></i>
                    Enviar instrucciones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}