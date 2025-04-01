import LateralBar from "../components/LateralBar";
import MapInMaps from "../components/MapInMaps";
export default function Users() {
    return (
        <div className="flex h-screen w-screen bg-white">
            <div>
                <LateralBar />
            </div>
            <div className="flex-1">
                <MapInMaps />
            </div>
        </div>
    )
}