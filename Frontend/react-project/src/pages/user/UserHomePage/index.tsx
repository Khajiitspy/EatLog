import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import foodImage from "../../../assets/food.jpg";
import dishImage from "../../../assets/dish.jpg";
import { useAppSelector } from "../../../store";
import { useNavigate } from "react-router";

const testimonials = [
    {
        id: 1,
        name: "Олена Петренко",
        role: "Домашній кухар",
        text: "EatLog допоміг мені нарешті впорядкувати всі мої записи. Тепер мої улюблені рецепти завжди під рукою!",
        image: "https://i.pravatar.cc/150?u=1",
        rating: 5
    },
    {
        id: 2,
        name: "Максим Коваль",
        role: "Фуд-блогер",
        text: "Дуже зручний інтерфейс! Можливість додавати власні рецепти це дуже круто!",
        image: "https://i.pravatar.cc/150?u=2",
        rating: 5
    },
    {
        id: 3,
        name: "Анна Сидоренко",
        role: "Веган-ентузіаст",
        text: "Пошук за інгредієнтами працює бездоганно. Тепер планування вечері займає лічені хвилини.",
        image: "https://i.pravatar.cc/150?u=3",
        rating: 4
    }
];

const UserHomePage: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const params = new URLSearchParams();
    params.set("q", searchTerm.trim());
    if (user) params.set("public", "true");

    navigate(`/recipes?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center border-t border-gray-200 dark:border-gray-800 justify-center rounded-3xl m-4 overflow-hidden shadow-xl">
        <img
          src={foodImage}
          alt="Cooking background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Готуйте із задоволенням
          </h1>
          <p className="text-slate-100 text-xl md:text-2xl mb-10 drop-shadow-md">
            Створюйте, впорядковуйте та відкривайте нові рецепти — все в одному місці.
          </p>

          {/* --- Search Bar --- */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto font-sans"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
            </div>
            <input
              type="text"
              placeholder="Пошук рецептів..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full py-5 pl-14 pr-20 rounded-full text-lg bg-white/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100/50 text-slate-700 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </section>

      {/* Guest Registration Section */}
      {!user && (
        <section className="relative m-4">
          <div className="w-full mx-auto bg-amber-300 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="relative z-10 text-center md:text-left md:max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                Зберігайте власні рецепти та плануйте меню разом із нами
              </h2>
              <p className="text-slate-800 text-lg opacity-90 mb-8">
                Приєднуйтесь до EatLog, щоб створювати власну цифрову кулінарну книгу та ділитися смаком із друзями.
              </p>
              <button
                onClick={() => navigate('/account/register')}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
              >
                Зареєструватися безкоштовно
              </button>
            </div>

            <div className="hidden lg:block relative z-10">
              <img src={dishImage} className="w-80 rotate-12 drop-shadow-2xl" alt="Dish" />
            </div>
          </div>
        </section>
      )}


      <section className="py-10 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black dark:text-white text-slate-900 mb-4">
              Що говорять наші кулінари
            </h2>
            <p className="text-slate-600 dark:text-white text-lg">Приєднуйтесь до тисяч задоволених користувачів EatLog</p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative hover:-translate-y-2 transition-all duration-500 group"
                    >
                        {/* Велика декоративна лапка */}
                        <FontAwesomeIcon
                            icon={faQuoteLeft}
                            className="absolute top-6 right-8 text-yellow-400/10 dark:text-yellow-400/5 text-6xl transition-colors group-hover:text-yellow-400/20"
                        />

                        {/* Рейтинг зірочками */}
                        <div className="flex gap-1.5 text-yellow-400 mb-6">
                            {[...Array(item.rating)].map((_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} className="text-[10px]" />
                            ))}
                        </div>

                        {/* Текст відгуку */}
                        <p className="text-gray-600 dark:text-gray-400 italic mb-8 relative z-10 leading-relaxed font-medium">
                            "{item.text}"
                        </p>

                        {/* Профіль автора */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-yellow-400 p-0.5 shadow-md shadow-yellow-400/20"
                                />
                                {/* Декоративний елемент поруч з фото */}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                            </div>

                            <div>
                                <h4 className="font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-1">
                                    {item.name}
                                </h4>
                                <p className="text-[10px] font-black text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">
                                    {item.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </section>
    </div>
  );
};

export default UserHomePage;
