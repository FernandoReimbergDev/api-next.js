'use client';

import { useState } from 'react';

export default function CreateConta() {
    const [formData, setFormData] = useState({
        conta: '',
        valor: 0,
        vencimento: '',
        status: '',
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
            const response = await fetch('/api/contas', {
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
            setStatus(`Conta criada com sucesso: ID ${data.id}`);

            setFormData({
                conta: '',
                valor: 0,
                vencimento: '',
                status: '',
            });
        } catch (error) {
            setStatus('Erro ao enviar dados.');
            console.error('Erro:', error);
        }
    };

    return (
        <div className='bg-gray-900 h-[100vh] grid place-content-center'>
            <h1>Cadastrar Conta</h1>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg flex flex-col gap-8'>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="conta">Conta:</label>
                    <input
                        type="text"
                        id="conta"
                        name="conta"
                        value={formData.conta}
                        onChange={handleChange}
                        required
                        className='border pl-4'
                    />
                </div>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="valor">valor:</label>
                    <input
                        type="number"
                        id="valor"
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        required
                        className='border pl-4'

                    />
                </div>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="vencimento">Vencimento:</label>
                    <input
                        type="text"
                        id="vencimento"
                        name="vencimento"
                        value={formData.vencimento}
                        onChange={handleChange}
                        required
                        className='border pl-4'
                    />
                </div>
                <div className='flex gap-2 items-start justify-start'>
                    <label htmlFor="status">Status:</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className='border pl-4'
                    />
                </div>
                <button type="submit" className='border rounded-sm w-fit px-4 mx-auto bg-sky-600 text-white font-semibold'>Cadastrar</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
