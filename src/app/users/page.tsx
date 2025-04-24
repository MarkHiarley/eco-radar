"use client"

import MapInMaps from "../components/MapInMaps";
import VLibras from "@djpfs/react-vlibras";

export default function Users() {
    return (
        <div className="flex h-screen w-screen bg-white">
            <VLibras forceOnload={true} />
            <div className="flex-1">
                <MapInMaps />
            </div>
        </div>
    )
}