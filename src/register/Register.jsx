import React, { useState } from "react";
import "./Register.css";
import { addUser } from "../api/api";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [walletAmount, setWalletAmount] = useState("");
  const [workArea, setWorkArea] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Phone:", phone);
    console.log("Wallet Amount:", walletAmount);
    console.log("Work Area:", workArea);

    addUser(username, email, password, phone, walletAmount, workArea);

    // TODO set current user
    navigate('/home');
  };

  return (
    <div className="register-container">
      <header className="login-header">
        <h1>Crowdfunding</h1>
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        
        <div className="input-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="walletAmount">Monto en la Cartera</label>
          <input
            type="number"
            id="walletAmount"
            value={walletAmount}
            onChange={(e) => setWalletAmount(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="workArea">Área de Trabajo</label>
          <input
            type="text"
            id="workArea"
            value={workArea}
            onChange={(e) => setWorkArea(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="register-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
