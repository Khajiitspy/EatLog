import { useState } from "react";
import { useLoginMutation } from "../../api/userService";
import {Link} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import foodImage from "../../assets/food.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();

      // Save token
      localStorage.setItem("token", result.token);

      // Redirect
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    /*<form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>Invalid email or password</p>}
    </form>*/


      <div className="flex min-h-screen bg-white">
          {/* ЛІВА ЧАСТИНА: Привітання (ховається на мобільних) */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20 relative overflow-hidden min-h-screen">

              {/* 1. Зображення як фон */}
              {/* absolute inset-0 розтягує картинку на весь батьківський блок */}
              <img
                  src={foodImage}
                  alt="Cooking Illustration"
                  className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 2. Шар затемнення (Overlay) */}
              {/* Це важливо, щоб текст залишався читабельним на фоні фото */}
              <div className="absolute inset-0 bg-amber-50/40 backdrop-blur-[4px]"></div>

              {/* 3. Контент (Текст) */}
              {/* relative та z-10 піднімають текст над зображенням */}
              <div className="relative z-10 max-w-md">
                  <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                      Вітаємо в <span className="text-amber-300">EatLog</span>!
                  </h1>
                  <p className="text-xl text-gray-800 mb-10 leading-relaxed">
                      Увійдіть, щоб створювати власні рецепти та персоналізувати свою кулінарну пригоду.
                  </p>
              </div>

          </div>

          {/* ПРАВА ЧАСТИНА: Форма входу */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32">
              <div className="max-w-md w-full mx-auto">
                  <div className="mb-10 text-center lg:text-left">
                      <h2 className="text-3xl font-bold text-slate-900">Вхід</h2>
                      <p className="text-slate-500 mt-2">
                          Немає аккаунту? {" "}
                          <Link to="/register" className="text-amber-300 font-semibold hover:underline">
                              Зареєструватися
                          </Link>
                      </p>
                  </div>

                  {/* Соціальні кнопки */}
                  <div className="flex gap-4 mb-8">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                          <span className="font-medium">Google</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                          <span className="font-medium">Facebook</span>
                      </button>
                  </div>

                  <div className="relative flex items-center mb-8">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-slate-400 text-sm">або</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  {/* Форма */}
                  <form className="space-y-6">
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">
                              Електронна пошта *
                          </label>
                          <input
                              type="email"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
                              placeholder="email@example.com"
                          />
                      </div>

                      <div>
                          <div className="flex justify-between mb-2">
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">
                                  Пароль *
                              </label>
                              <a href="#" className="text-sm text-slate-400 hover:text-purple-600 transition">Забули пароль?</a>
                          </div>
                          <div className="relative">
                              <input
                                  type="password"
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
                                  placeholder="Ваш пароль"
                              />
                              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                  <FontAwesomeIcon icon={faEyeSlash} />
                              </button>
                          </div>
                      </div>

                      <button
                          type="submit"
                          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                      >
                          Увійти
                      </button>
                  </form>
              </div>
          </div>
      </div>



  );
};

export default LoginPage;
