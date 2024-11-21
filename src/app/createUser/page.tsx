'use client';

import { useState } from 'react';

export default function CreateUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null); // Limpa status

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setStatus(`Erro: ${errorData.error}`);
                return;
            }

            const data = await response.json();
            setStatus(`Usuário criado com sucesso: ID ${data.id}`);

            setFormData({
                name: '',
                email: '',
                password: '',
            });
        } catch (error) {
            setStatus('Erro ao enviar dados.');
            console.error('Erro:', error);
        }
    };

    return (
        <div className='bg-gray-900 h-[100vh] grid place-content-center'>
            <h1>Criar Usuário</h1>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg flex flex-col gap-8'>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className='border pl-4'
                    />
                </div>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='border pl-4'

                    />
                </div>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='border pl-4'
                    />
                </div>
                <button type="submit" className='border rounded-sm w-fit px-4 mx-auto bg-sky-600 text-white font-semibold'>Criar</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
