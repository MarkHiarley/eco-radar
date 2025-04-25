"use client"
import { useSession, signIn } from "next-auth/react";
import dynamic from 'next/dynamic';
const SetLocal = dynamic(() => import('../components/SetLocal'), {
    ssr: false,
});

export default function TestPage() {
    const { data: session } = useSession();
    {/** 
if(!session){
    return(
        <div>

    <h1>Não logado</h1>
    <button onClick={() => signIn("google")}>loge</button>
    </div>
)
*/}

    return (
        <div className="flex-1">
            <SetLocal />
        </div>
    )
}