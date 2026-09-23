import { useState } from 'react';

const Icono = ({ children }: { children: string }) => (
  <span className="icono" aria-hidden="true">{children}</span>
);

export function App() {
  const [sesion, setSesion] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(true);

  if (!sesion) {
    return (
      <main className="login">
        <section className="login-panel">
          <div className="marca">
            <img src="/logo-hospital-contable-login.png" alt="Hospital María Esperanza" />
            <div><strong>HME</strong><small>HEMODIÁLISIS</small></div>
          </div>
          <p className="etiqueta">ACCESO AL SISTEMA</p>
          <h1>Bienvenido</h1>
          <p className="descripcion">Ingresa al sistema de Hemodiálisis del Hospital María Esperanza.</p>
          <label>Usuario<input defaultValue="administrador" /></label>
          <label>Contraseña<input type="password" defaultValue="123456" /></label>
          <button className="boton-primario" onClick={() => setSesion(true)}>
            Iniciar sesión <span>→</span>
          </button>
          <small className="pie-login">Hospital María Esperanza · Sistema de Hemodiálisis</small>
        </section>
        <aside className="login-lateral">
          <div>
            <span className="cruz">✦</span>
            <p>ATENCIÓN ESPECIALIZADA</p>
            <h2>Control y cuidado en cada sesión.</h2>
            <small>Plataforma institucional de Hemodiálisis.</small>
          </div>
        </aside>
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
