import './style.css';
import Tarjeta from './Tarjeta';

function App() {
  const tarjetas = [
    {
      nombre: "Ana Pérez",
      profesion: "Desarrolladora Web",
      mensaje: "Apasionada por la creatividad y el diseño con propósito.",
      email: "ana.perez99@gamil.com",
      telefono: "123-456-7890",
      redes: [
        { nombre: "linkedin", url: "https://www.linkedin.com/in/anaperez" },
        { nombre: "instagram", url: "https://www.instagram.com/anaperez" },

      ],
    },
    {
      nombre: "Carlos Gómez",
      profesion: "Ingeniero Industrial",
      mensaje: "Especialista en optimización de procesos.",
      email: "carlos.gomez@gmail.com",
      telefono: "987-654-3210",
      redes: [
        { nombre: "linkedin", url: "https://www.linkedin.com/in/carloslopez" },
        { nombre: "instagram", url: "https://www.instagram.com/carloslopez" },
      ],
    },
    {
      nombre: "Luisa Martínez",
      profesion: "Diseñadora Gráfica",
      mensaje: "Creatividad y diseño para tu marca.",
      email: "luisa.martinez09@gmail.com",
      telefono: "555-123-4567",
      redes: [
        { nombre: "LinkedIn", url: "https://linkedin.com/in/luisamartinez-fake" },
        { nombre: "Instagram", url: "https://instagram.com/luisa.creativa.fake" }
      ],
    },
    {
      nombre: "Miguel Torres",
      profesion: "Analista de Datos",
      mensaje: "Transformando datos en decisiones.",
      email: "miguel12.torres@gmail.com",
      telefono: "444-555-6666",
      redes: [
        { nombre: "LinkedIn", url: "https://linkedin.com/in/migueltorres-dev" },
        { nombre: "Instagram", url: "https://instagram.com/miguel.codes.fake" }
      ],
    },
    {
      nombre: "Diana Cabos",
      profesion: "Ingeniera en Proyectos de Inversión",
      mensaje: "Convierte numeros en decisiones inteligentes.",
      email: "diana.gaca04@gmail.com",
      telefono: "334-234-2345",
      redes: [
        { nombre: "LinkedIn", url: "https://linkedin.com/in/dianacabos-analytics" },
        { nombre: "Instagram", url: "https://instagram.com/diana.data.fake" }
      ],
    },
    {
      nombre: "Jorge Toxtle",
      profesion: "Project Manager",
      mensaje: "Liderazgo, estrategia y resultados en cada proyecto.",
      email: "jorge.alv32@gmail.com",
      telefono: "334-234-2345",
      redes: [
        { nombre: "LinkedIn", url: "https://linkedin.com/in/jorgealvarez-pm" },
        { nombre: "Instagram", url: "https://instagram.com/jorge.leads.fake" }
      ],
    },
  ];

  return (
    <div>
      <h1>Bolsa de Trabajo</h1>
      <h2>Tarjetas de Presentación</h2>
      <div className="contenedor-tarjetas">
        {tarjetas.map((tarjeta, index) => (
          <Tarjeta
            key={index}
            nombre={tarjeta.nombre}
            profesion={tarjeta.profesion}
            mensaje={tarjeta.mensaje}
            email={tarjeta.email}
            telefono={tarjeta.telefono}
            redes={tarjeta.redes} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
