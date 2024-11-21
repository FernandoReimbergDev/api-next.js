import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function POST(req: Request) {
    const body = await req.json();
    const { conta, valor, vencimento, status } = body;

    if (!conta || !valor || !vencimento || !status) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO contas (conta, valor, vencimento, status) VALUES (?, ?, ?, ?)',
            [conta, valor, vencimento, status],
            function (err) {
                if (err) {
                    console.error('Erro ao inserir conta:', err.message);
                    reject(NextResponse.json({ error: 'Erro ao inserir conta.' }, { status: 500 }));
                } else {
                    resolve(
                        NextResponse.json(
                            { id: this.lastID, conta, valor, vencimento, status},
                            { status: 201 }
                        )
                    );
                }
            }
        );
    });
}
