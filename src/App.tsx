import { useState } from 'react';

type Vista = 'recepcion' | 'consulta';
const Icono = ({ children }: { children: string }) => (
  <span className="icono" aria-hidden="true">
    {children}
  </span>
);

export function App() {
  const [sesion, setSesion] = useState(false);
  const [vista, setVista] = useState<Vista>('recepcion');
  const [menuAbierto, setMenuAbierto] = useState(true);
  if (!sesion)
    return (
      <main className="login">
        <section className="login-panel">
        <div className="marca">
          <img src="/logo-hospital-contable-login.png" alt="Hospital María Esperanza" />
            <div>
              <strong>HME</strong>
              <small>HEMODIÁLISIS</small>
            </div>
          </div>
          <p className="etiqueta">ACCESO AL SISTEMA</p>
          <h1>Bienvenido</h1>
          <p className="descripcion">
            Ingresa para gestionar las sesiones y el seguimiento de pacientes.
          </p>
          <label>
            Usuario
            <input defaultValue="administrador" />
          </label>
          <label>
            Contraseña
            <input type="password" defaultValue="123456" />
          </label>
          <button className="boton-primario" onClick={() => setSesion(true)}>
            Iniciar sesión <span>→</span>
          </button>
          <small className="pie-login">
            Hospital María Esperanza · Sistema de Hemodiálisis
          </small>
        </section>
        <aside className="login-lateral">
          <div>
            <span className="cruz">✦</span>
            <p>ATENCIÓN ESPECIALIZADA</p>
            <h2>Control y cuidado en cada sesión.</h2>
            <small>
              Una plataforma para recepción, consulta y seguimiento clínico.
            </small>
          </div>
        </aside>
      </main>
    );
  return (
    <main className={`app ${menuAbierto ? '' : 'menu-cerrado'}`}>
      <header className="topbar">
        <button className="menu" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>
          <div className="top-marca">
            <img src="/logo-hospital-contable-lila.png" alt="Hospital María Esperanza" />
          <strong>Hemodiálisis</strong>
        </div>
        <label className="buscador">
          ⌕<input placeholder="Buscar paciente, sesión o módulo" />
        </label>
        <button className="campana">♧</button>
        <div className="usuario">
          <span>AD</span>
          <div>
            <strong>Administrador</strong>
            <small>Administrador</small>
          </div>
        </div>
        <button className="salir" onClick={() => setSesion(false)}>
          ⇥
        </button>
      </header>
      <aside className="sidebar">
        <div className="sidebar-titulo">OPERACIÓN</div>
        <button
          className={vista === 'recepcion' ? 'activo' : ''}
          onClick={() => setVista('recepcion')}
        >
          <Icono>▣</Icono>
          <span>Recepción</span>
        </button>
        <button
          className={vista === 'consulta' ? 'activo' : ''}
          onClick={() => setVista('consulta')}
        >
          <Icono>♙</Icono>
          <span>Consulta</span>
        </button>
        <div className="sidebar-titulo secundario">SISTEMA</div>
        <button>
          <Icono>◫</Icono>
          <span>Reportes</span>
        </button>
        <button>
          <Icono>⚙</Icono>
          <span>Configuración</span>
        </button>
        <footer>
          <span className="estado"></span> Sistema operativo
        </footer>
      </aside>
      <section className="contenido">
        {vista === 'recepcion' ? <Recepcion /> : <Consulta />}
      </section>
    </main>
  );
}

function Recepcion() {
  return (
    <>
      <header className="vista-cabecera">
        <div>
          <p>OPERACIÓN / RECEPCIÓN</p>
          <h1>Recepción de pacientes</h1>
          <small>
            Registra llegadas y prepara a los pacientes para su sesión.
          </small>
        </div>
        <button className="boton-primario">+ Registrar ingreso</button>
      </header>
      <div className="kpis">
        <article>
          <small>PACIENTES HOY</small>
          <strong>18</strong>
          <span>Programados para hoy</span>
        </article>
        <article>
          <small>EN SALA</small>
          <strong>7</strong>
          <span>Sesiones en curso</span>
        </article>
        <article>
          <small>PENDIENTES</small>
          <strong>4</strong>
          <span>Por confirmar ingreso</span>
        </article>
        <article>
          <small>SESIONES FINALIZADAS</small>
          <strong>11</strong>
          <span>Completadas hoy</span>
        </article>
      </div>
      <section className="panel">
        <header className="panel-cabecera">
          <div>
            <p>AGENDA DEL DÍA</p>
            <h2>Pacientes programados</h2>
          </div>
          <label className="filtro">
            ⌕ <input placeholder="Buscar paciente o historia clínica" />
          </label>
        </header>
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Historia clínica</th>
              <th>Turno</th>
              <th>Máquina</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'María Fernández López',
                'HC-004821',
                '07:00',
                'HD-03',
                'En sala',
              ],
              [
                'Carlos Mendoza Rojas',
                'HC-003615',
                '08:00',
                'HD-05',
                'Confirmado',
              ],
              [
                'Ana Rodríguez Vargas',
                'HC-005092',
                '09:30',
                'HD-01',
                'Pendiente',
              ],
              [
                'Roberto Quispe Flores',
                'HC-002978',
                '10:30',
                'HD-02',
                'Pendiente',
              ],
            ].map(([n, h, t, m, e]) => (
              <tr key={h}>
                <td>
                  <strong>{n}</strong>
                  <small>Paciente de Hemodiálisis</small>
                </td>
                <td>{h}</td>
                <td>{t}</td>
                <td>{m}</td>
                <td>
                  <em className={e.toLowerCase().replace(' ', '-')}>{e}</em>
                </td>
                <td>
                  <button className="accion">Ver ficha</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
function Consulta() {
  return (
    <>
      <header className="vista-cabecera">
        <div>
          <p>ATENCIÓN CLÍNICA / CONSULTA</p>
          <h1>Consulta de Hemodiálisis</h1>
          <small>Revisa la evolución y registra indicaciones médicas.</small>
        </div>
        <button className="boton-primario">+ Nueva consulta</button>
      </header>
      <div className="consulta-layout">
        <section className="panel pacientes">
          <header>
            <p>PACIENTES</p>
            <h2>En atención</h2>
          </header>
          {[
            'María Fernández López',
            'Carlos Mendoza Rojas',
            'Ana Rodríguez Vargas',
          ].map((n, i) => (
            <button className={i === 0 ? 'seleccionado' : ''} key={n}>
              <span>
                {n
                  .split(' ')
                  .map((x) => x[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <div>
                <strong>{n}</strong>
                <small>
                  HD-{String(i + 1).padStart(2, '0')} · Sesión activa
                </small>
              </div>
            </button>
          ))}
        </section>
        <section className="panel historia">
          <header>
            <p>HISTORIA CLÍNICA · HC-004821</p>
            <h2>María Fernández López</h2>
            <small>Sesión 128 · Turno mañana · Máquina HD-03</small>
          </header>
          <div className="signos">
            <article>
              <small>PRESIÓN ARTERIAL</small>
              <strong>120 / 80</strong>
              <span>mmHg</span>
            </article>
            <article>
              <small>PESO PRE-DIÁLISIS</small>
              <strong>62.4</strong>
              <span>kg</span>
            </article>
            <article>
              <small>TIEMPO PROGRAMADO</small>
              <strong>4:00</strong>
              <span>horas</span>
            </article>
          </div>
          <label className="nota">
            Evolución clínica
            <textarea placeholder="Registra la evolución e indicaciones de la consulta…" />
          </label>
          <div className="acciones">
            <button className="boton-secundario">Guardar borrador</button>
            <button className="boton-primario">Finalizar consulta</button>
          </div>
        </section>
      </div>
    </>
  );
}
