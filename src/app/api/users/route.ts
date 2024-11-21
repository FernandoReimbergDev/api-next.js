import { NextResponse } from 'next/server';
import db from '../../lib/db';

const SECRET_KEY = process.env.API_SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error('API_SECRET_KEY não foi definida no arquivo .env')
}

function validateSecretKey(req: Request) {
    const secretKey = req.headers.get('x-api-key');
    if (!secretKey || secretKey !== SECRET_KEY) {
        return false;
    }
    return true;
}
// ROTA GET PARA LISTAR USUARIOS
export async function GET(req: Request) {
    if (!validateSecretKey(req)) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

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


//ROTA POST PARA CADASTRAR USUARIO
export async function POST(req: Request) {

    if (!validateSecretKey(req)) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

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
