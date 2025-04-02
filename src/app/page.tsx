import FireIcon from "./components/FireIcon";
import MapMundi from "./components/MapMundi";
import TextTitle from "./components/TextTittle";
import GoogleButton from "./components/GoogleButton";
import LineSeparator from "./components/LineSeparator";
export default function Home() {

  return (
    
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center flex-wrap">

      <div className="flex flex-col lg:flex-row justify-center items-center w-full h-full lg:space-x-6 space-y-6 lg:space-y-0">

        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 space-y-6 px-4">
          <div className="flex justify-center items-center w-1/2 h-1/4">
            <FireIcon />
          </div>

          <TextTitle />
          <LineSeparator />
          <GoogleButton />
        </div>


        <div className="flex flex-col justify-center items-center w lg:w-1/2 px-4">
          <MapMundi/>
        </div>
      </div>
    </div>
  );
}