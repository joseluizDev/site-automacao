import React, { useState } from "react";
import "./login.css"; // Certifique-se de criar este arquivo

function Login2() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 5000); // Alerta desaparece após 5 segundos
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <SignUpForm showAlert={showAlert} togglePanel={togglePanel} />
      </div>
      <div className="form-container sign-in-container">
        <SignInForm showAlert={showAlert} togglePanel={togglePanel} />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Bem-vindo de volta!</h1>
            <p>Para permanecer conectado conosco, por favor faça login com suas informações pessoais</p>
            <button className="ghost" onClick={togglePanel}>
              Login
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Olá, Amigo!</h1>
            <p>Inscreva-se e descubra uma incrível experiência conosco</p>
            <button className="ghost" onClick={togglePanel}>
              Cadastro
            </button>
          </div>
        </div>
      </div>

      {alert.show && (
        <div className="alert">
          <p>{alert.message}</p>
        </div>
      )}
    </div>
  );
}

function SignInForm({ showAlert, togglePanel }) {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;

    try {
      const response = await fetch('https://apis-auto-atendimento-api.uwqcav.easypanel.host/login',
        {
          port: 8000,
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: email,  // Usando email como login
            senha: password
          })
        });

      const data = await response.json();

      if (response.ok) {
        showAlert(`Login bem-sucedido. Token JWT: ${data.idUsuario}`);
        localStorage.setItem("token", data.idUsuario); // Armazena o token
        // mudar para a página de perfil
        window.location.href = "/dashboard";
      } else {
        showAlert(data.error || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro:", error);
      showAlert("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h1>Entrar</h1>
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

function SignUpForm({ showAlert, togglePanel }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    telefone: ""
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password, telefone } = state;

    try {
      const response = await fetch('https://apis-auto-atendimento-api.uwqcav.easypanel.host/register', {
        method: 'POST',
        port: 8000,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          login: email,
          senha: password,
          telefone: telefone
        })
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("Cadastro bem-sucedido. Faça login para continuar.");

        // deley de 2 segundos para mudar para o painel de login
        setTimeout(() => {
          togglePanel();
        }, 2000);

      } else {
        showAlert(data.error || "Erro ao fazer cadastro.");
      }
    } catch (error) {
      console.error("Erro:", error);
      showAlert("Erro ao conectar-se ao servidor.");
    }

    setState({
      name: "",
      email: "",
      password: "",
      telefone: ""
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h1>Criar Conta</h1>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        type="text"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <input
        type="text"
        name="telefone"
        value={state.telefone}
        onChange={handleChange}
        placeholder="Telefone"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default Login2;
