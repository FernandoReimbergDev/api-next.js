"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href={"/createUser"}>Criar usuario</Link>
      <Link href={"/getUser"}>Listar usuario</Link>
      <Link href={"/createConta"}>Cadastrar conta</Link>
    </div>
  );
}
