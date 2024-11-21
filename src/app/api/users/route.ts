import { NextResponse } from 'next/server';
import db from '../../lib/db';

// Lidar com requisições GET
export async function GET() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar usuários:', err.message);
                reject(NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows, { status: 200 }));
            }
        });
    });
}

// Lidar com requisições POST
export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password],
            function (err) {
                if (err) {
                    console.error('Erro ao inserir usuário:', err.message);
                    reject(NextResponse.json({ error: 'Erro ao inserir usuário.' }, { status: 500 }));
                } else {
                    resolve(
                        NextResponse.json(
                            { id: this.lastID, name, email, is_active: true },
                            { status: 201 }
                        )
                    );
                }
            }
        );
    });
}
