import citaImg from '../assets/cita-medica.png';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Plataforma de Citas Médicas</h1>
      <p>Gestiona tus citas de forma sencilla y rápida.</p>
      <img src={citaImg} alt="Cita médica" className="imagen-inicio" />
    </div>
  );
}

export default Home;
