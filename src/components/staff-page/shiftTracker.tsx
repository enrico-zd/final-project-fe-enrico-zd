import { Fingerprint } from "lucide-react";
import RealtimeClock from "./realtimeClock";

const ShiftTracker = () => {
    
    return (
        <div className="flex flex-col w-[94%] items-center gap-4">
            <div>
                <RealtimeClock locale="en-US" timeZone="Asia/Jakarta" hour12={false}/>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div>

                <button className="w-28 h-28 bg-amber-400 rounded-full flex justify-center items-center">
                    <Fingerprint className="w-16 h-16"/>
                </button>
                </div>
                <div>
                    <p>Check In | Check Out</p>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-row justify-between">
                    <p>08:00:00</p>
                    <p>16:00:00</p>
                </div>
                <div className="bg-amber-400  text-center rounded-lg py-0.5">
                    0 hr 0 min
                </div>
            </div>
        </div>
    )
}

export default ShiftTracker;