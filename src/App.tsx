import { useState } from 'react';
import './login.css';

const Icono = ({ children }: { children: string }) => (
  <span className="icono" aria-hidden="true">{children}</span>
);

export function App() {
  const [sesion, setSesion] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    try { return localStorage.getItem('hemodialisis-usuario') || 'admin'; }
    catch { return 'admin'; }
  });
  const [recordar, setRecordar] = useState(true);

  if (!sesion) {
    return (
      <main className="hemo-login">
        <div className="hemo-login-card">
          <aside className="hemo-login-brand">
            <img className="hemo-login-logo" src="/logo-hospital-contable-lila.png" alt="Hospital María Esperanza" />
            <div className="hemo-login-copy">
              <p className="hemo-login-eyebrow">ATENCIÓN ESPECIALIZADA</p>
              <h2>Gestión de <br />hemodiálisis</h2>
              <p className="hemo-login-description">Accede a la información de pacientes, sesiones y tratamientos del Hospital María Esperanza desde un solo lugar.</p>
            </div>
            <p className="hemo-login-footer">Hospital María Esperanza · Unidad de Hemodiálisis</p>
          </aside>
          <section className="hemo-login-access" aria-labelledby="login-title">
            <form className="hemo-login-form" onSubmit={event => {
              event.preventDefault();
              try {
                if (recordar) localStorage.setItem('hemodialisis-usuario', usuario);
                else localStorage.removeItem('hemodialisis-usuario');
              } catch { /* El acceso sigue disponible si el almacenamiento está restringido. */ }
              setMostrarClave(false);
              setSesion(true);
            }}>
              <p className="hemo-login-eyebrow">ACCESO AL SISTEMA DE HEMODIÁLISIS</p>
              <h1 id="login-title">Iniciar sesión</h1>
              <p className="hemo-login-subtitle">Ingresa tus credenciales para acceder al sistema.</p>
              <label className="hemo-login-label" htmlFor="hemo-user">Usuario</label>
              <div className="hemo-login-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10" cy="7" r="3" /><path d="M3 21v-3a7 7 0 0 1 14 0v3H3ZM17 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2h-3" /></svg>
                <input id="hemo-user" name="username" autoComplete="username" value={usuario} onChange={event => setUsuario(event.target.value)} placeholder="Ingresa tu usuario" required />
              </div>
              <label className="hemo-login-label" htmlFor="hemo-password">Contraseña</label>
              <div className="hemo-login-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></svg>
                <input id="hemo-password" name="password" type={mostrarClave ? 'text' : 'password'} autoComplete="current-password" placeholder="Ingresa tu contraseña" required />
                <button className="hemo-login-eye" type="button" aria-label={mostrarClave ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={mostrarClave} onClick={() => setMostrarClave(!mostrarClave)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{mostrarClave && <path d="m3 3 18 18" />}</svg>
                </button>
              </div>
              <label className="hemo-login-remember"><input type="checkbox" checked={recordar} onChange={event => setRecordar(event.target.checked)} />Recordar mi usuario</label>
              <button className="hemo-login-submit" type="submit">Iniciar sesión <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={`app ${menuAbierto ? '' : 'menu-cerrado'}`}>
      <header className="topbar">
        <button className="menu" onClick={() => setMenuAbierto(!menuAbierto)}>☰</button>
        <div className="top-marca">
          <span className="top-modulo-icono">♙</span>
          <strong>Hemodiálisis</strong>
        </div>
        <label className="buscador">⌕<input placeholder="Buscar un módulo" /></label>
        <button className="campana" aria-label="Notificaciones">♧</button>
        <div className="usuario">
          <span>AD</span>
          <div><strong>Administrador</strong><small>Administrador</small></div>
        </div>
        <button className="salir" aria-label="Cerrar sesión" onClick={() => setSesion(false)}>⇥</button>
      </header>

      <aside className="sidebar">
        <div className="sidebar-marca">
          <img src="/logo-hospital-contable-lila.png" alt="Hospital María Esperanza" />
          <button
            className="sidebar-replegar"
            aria-label={menuAbierto ? 'Contraer menú' : 'Expandir menú'}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? '‹' : '›'}
          </button>
        </div>

        <div className="sidebar-titulo">OPERACIÓN</div>
        <button className="activo"><Icono>▣</Icono><span>Recepción</span></button>
        <button><Icono>♙</Icono><span>Consulta</span></button>

        <div className="sidebar-titulo secundario">SISTEMA</div>
        <button><Icono>▥</Icono><span>Reportes</span></button>
        <button><Icono>⚙</Icono><span>Configuración</span></button>

        <footer><span className="estado" /> Sistema operativo</footer>
      </aside>

      <section className="contenido" aria-label="Área de trabajo" />
    </main>
  );
}
