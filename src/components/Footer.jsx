import { FaReact } from "react-icons/fa6";

export default function Footer(){
    return(
        <div className="container-fluid py-2" style={{background:"transparent",fontFamily:"Arial"}}>
            <p className="text-center">
                &copy; Padmanabh P V 2025 | Made using <span style={{color:'#61DAFB'}}>React <FaReact className="mb-1"/></span>
            </p>
        </div>
    )
}