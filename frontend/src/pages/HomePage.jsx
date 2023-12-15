// HomePage.js
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function HomePage() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h1>Bienvenido a ExpTravel !!! </h1>
      <p>
        ¡Bienvenidos a ExpTravel, el fascinante rincón digital donde las experiencias de viaje cobran vida a través de relatos apasionantes! Sumérgete en un mundo diverso de aventuras contadas por viajeros de todos los rincones del planeta. Desde las majestuosas montañas hasta las playas más exóticas, nuestros narradores te transportarán a destinos lejanos con cada palabra. Únete a esta comunidad global de trotamundos, comparte tus propias odiseas y descubre la riqueza cultural que el mundo tiene para ofrecer. ExpTravel es tu pasaporte a la inspiración, la emoción y la conexión humana a través de las maravillas del viaje. ¡Prepárate para explorar el mundo desde la comodidad de tu pantalla y dejar que cada historia te lleve a una nueva y emocionante travesía! ¡Bienvenidos a bordo! 🌍✈️
      </p>

      {auth && auth.user && (
        <Link to="/post">Busca tu nuevo destino !! </Link>
      )}

      <br />
      <hr />
      <div className={styles.buttonContainer}>
        {auth && auth.user ? (
          <button onClick={() => logout()} className={styles.logoutButton}>Logout</button>
        ) : (
          <>
            <Link to="/register">Registro</Link>
            <span className={styles.buttonSeparator}> | </span>
            <Link to="/login">Login </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;



