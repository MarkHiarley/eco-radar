"use client"
import { useSession, signIn } from "next-auth/react";

export default function TestPage() {
    const {data: session} = useSession();

if(!session){
    return(
        <div>

    <h1>Não logado</h1>
    <button onClick={() => signIn("google")}>loge</button>
    </div>
)
}

    return (
        <div>
        <h1>Test Page</h1>
        <p>This is a test page.</p>
        </div>
    );
}