
import Link from "next/link"
import Dropdown from "../Dropdown"

export default function () {
    return (
        <header className="w-full bg-red-800 h-14 flex items-center px-4 py-2">
            <nav className="px-4 py-2 h-10 ml-2 flex gap-4">
                <Dropdown text="Usuários ▾">
                    <li className="hover:bg-gray-200 px-2 py-1">
                        <Link href={"/createUser"}>Cadastrar user</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-2 py-1">
                        <Link href={"/getUser"}>Listar usuario</Link>
                    </li>
                </Dropdown>
                <Dropdown text="Budget ▾">
                    <li className="hover:bg-gray-200 px-2 py-1">
                        <Link href={"/createConta"}>Cadastrar conta</Link>
                    </li>
                </Dropdown>
            </nav>
        </header>
    )
}