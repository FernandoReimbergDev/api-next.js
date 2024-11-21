'use client'

import { useEffect, useState } from "react"

type User = {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    created_at: string;
}

export default function GetUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', {
                    headers: {
                        'x-api-key': 'wsx135jhg6789',
                    },
                });


                if (!response.ok) {
                    const errorData = await response.json();
                    setError(`Erro: ${errorData.error}`);
                    return;
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError('Error ao buscar os usuários.')
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="h-[calc(100vh - 56px)] p-8">
            <h1 className="text-xl border shadow-xl max-w-7xl mx-auto font-bold mb-4 p-2">Lista de Usuários</h1>
            {error && <p className="text-red-500">{error}</p>}
            {users.length > 0 ? (
                <table className="table-auto w-full max-w-7xl mx-auto bg-white shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nome</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Ativo</th>
                            <th className="px-4 py-2">Criado em</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center border-t">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.is_active ? 'Sim' : 'Não'}</td>
                                <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-white text-center">Nenhum usuário encontrado.</p>
            )}
        </div>
    );
}