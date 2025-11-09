import { FaGithub, FaMastodon,FaEnvelope, FaInstagram, FaTelegram, FaXTwitter, FaGitlab } from 'react-icons/fa6';
import './main.css';
export default function Social(){
    return(
        <div className="social py-2">
            <a target='_blank' href="https://mstdn.social/@padmanabhpvdev"><FaMastodon/></a>
            <a target='_blank' href="https://gitlab.com/padmanabhpvdev"><FaGitlab/></a>
            <a target='_blank' href="https://github.com/padmanabhpvdev"><FaGithub/></a>
            <a target='_blank' href="https://x.com/padmanabhpv100"><FaXTwitter/></a>
            <a target='_blank' href="https://t.me/PadmanabhPV_DEVeloper"><FaTelegram/></a>
            <a target='_blank' href="https://instagram.com/padmanabh.in"><FaInstagram/></a>
            <a target='_blank' href="mailto:padmanabhpv2k04@gmail.com"><FaEnvelope/></a>
        </div>
    )
}