import sqlite3 from 'sqlite3';
import path from 'path';

// Caminho para o arquivo do banco
const dbPath = path.resolve(process.cwd(), 'database.sqlite');

// Inicializa o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log(`Banco de dados conectado em: ${dbPath}`);
    }
});

// Cria as tabelas se não existirem
db.serialize(() => {
    // Criação da tabela 'users'
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            is_active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela users:', err.message);
        } else {
            console.log('Tabela users criada/verificada.');
        }
    });

    // Criação da tabela 'contas'
    db.run(`
        CREATE TABLE IF NOT EXISTS contas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conta TEXT NOT NULL,
            valor REAL NOT NULL,
            vencimento TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela contas:', err.message);
        } else {
            console.log('Tabela contas criada/verificada.');
        }
    });
});

export default db;
