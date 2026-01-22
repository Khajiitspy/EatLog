import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserGear, faTrash, faSearch, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {useGetUsersQuery} from "../../../../api/adminService.ts";
import {APP_ENV} from "../../../../env";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";


const UserListPage: React.FC = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
    );

    if (error) return (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-[2rem] border border-red-100 dark:border-red-800">
            <p className="text-red-500 font-bold text-lg">Помилка завантаження користувачів</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* ШАПКА СТОРІНКИ */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                        Користувачі <span className="text-yellow-400">EatLog</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-sm">
                        Всього зареєстровано: <span className="text-gray-900 dark:text-white font-black">{users?.length || 0}</span>
                    </p>
                </div>

                {/* ПОШУК */}
                <div className="relative group max-w-md w-full">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Пошук за іменем або email..."
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 outline-none focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400 transition-all text-sm text-gray-900 dark:text-white"
                    />
                </div>
            </div>


            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="border-b border-gray-50 dark:border-gray-800/50">
                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Користувач</th>
                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Ролі</th>
                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Статус</th>
                            <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Дії</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {users?.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">

                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={`${APP_ENV.IMAGES_50_URL}${user.image}`}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-2xl object-cover border-2 border-transparent group-hover:border-yellow-400 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 dark:text-white tracking-tight">{user.name}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-[10px]" />
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-8 py-5">
                                    <div className="flex gap-2">
                                        {user.roles.map((role, i) => (
                                            <span key={i} className="px-3 py-1 rounded-lg bg-yellow-400/10 dark:bg-yellow-400/5 text-yellow-600 dark:text-yellow-400 text-[10px] font-black uppercase tracking-wider border border-yellow-400/20">
                                                    {role}
                                                </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-8 py-5">
                                    <div className="flex  gap-2">
                                        {user.isLoginGoogle && (
                                            <div
                                                title="Вхід через Google"
                                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 border border-blue-100 dark:border-blue-500/20 shadow-sm"
                                            >
                                                <FontAwesomeIcon icon={faGoogle} className="text-sm" />
                                            </div>
                                        )}
                                        {user.isLoginPassword && (
                                            <div
                                                title="Вхід через Пароль"
                                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-yellow-50 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-400/20 shadow-sm"
                                            >
                                                <FontAwesomeIcon icon={faKey} className="text-sm" />
                                            </div>
                                        )}
                                    </div>
                                </td>


                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-gray-900 transition-all flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:border-yellow-400">
                                            <FontAwesomeIcon icon={faUserGear} />
                                        </button>
                                        <button className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:border-red-500">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserListPage;