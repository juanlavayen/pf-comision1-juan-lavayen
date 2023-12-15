// Importa las bibliotecas necesarias
import { useContext, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/NewPost.module.css"; // Importa el archivo de estilos

// Componente para crear un nuevo post
const NewPost = () => {
  const [title, setTitle] = useState(""); // Estado para el título del post
  const [description, setDescription] = useState(""); // Estado para la descripción del post
  const [imageURL, setImageURL] = useState(""); // Estado para la URL de la imagen del post
  const { auth } = useContext(AuthContext); // Obtiene la información de autenticación
  const navigate = useNavigate(); // Función para la navegación

  // Maneja la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica que el título no esté vacío
    if (!title.trim()) return;

    // Realiza una solicitud POST al servidor para crear un nuevo post
    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        imageURL: imageURL.trim(),
      }),
    }).then((res) => {
      // Verifica el estado de la respuesta
      if (res.status !== 201) return alert("Error creating post");

      // Navega a la página de posts después de la creación exitosa
      navigate("/post");
    });
  };

  // Renderiza el formulario y otros elementos de la interfaz
  return (
    <div>
      <Navbar />
      <h2>Crear nuevo viaje</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          placeholder="My new Post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Descripcion:</label>
        <textarea
          id="description"
          placeholder="Enter a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          placeholder="Enter the image URL..."
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

// Exporta el componente
export default NewPost;

