// Innloggingsskjema med validering, feilhåndtering og vis/skjul passord funksjonalitet
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Type-definisjoner for skjemadata og feilmeldinger
type LoginFormData = {
  username: string;
  password: string;
};

type FormErrors = {
  username?: string;
  password?: string;
};

export const LoginPage = () => {
  // Tilstandshåndtering for skjemadata og feilmeldinger
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validerer skjemafeltene før innsending
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Brukernavn er påkrevd";
    }

    if (!formData.password) {
      newErrors.password = "Passord er påkrevd";
    } else if (formData.password.length < 5) {
      newErrors.password = "Passord må være minst 5 tegn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Håndterer skjemainnsending
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const success = login(formData.username, formData.password);
      if (success) {
        navigate("/");
      } else {
        setErrors({ password: "Ugyldig brukernavn eller passord" });
      }
    }
  };

  // Håndterer endringer i inputfelt
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Fjerner feilmelding når bruker begynner å skrive
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="container login-container">
      <h1>Logg inn</h1>
      <p>Velkommen tilbake!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Brukernavn</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="password-field">
          <label htmlFor="password">Passord</label>
          <div className="password-input-container">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Logg inn</button>
      </form>
    </div>
  );
};
