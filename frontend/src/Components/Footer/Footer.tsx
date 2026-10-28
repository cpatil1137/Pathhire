import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";
import Logo from "../Logo/Logo";

const Footer = () => {
    const location=useLocation();
    return location.pathname!='/signup' && location.pathname!='/login'?<div className="flex flex-col gap-2">
        <div className="pt-20 pb-5 bg-mine-shaft-950 p-4  flex gap-8 justify-around flex-wrap">
            <div data-aos="fade-up"  data-aos-offset="0"  className="w-1/4 sm-mx:w-1/3   xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
                <div className="flex gap-2 items-center text-bright-sun-400">
                    <Logo size="small" />
                    <div className="text-xl font-semibold">PathHire</div>
                </div>
                <div className="text-sm text-mine-shaft-300">Job portal with user profiles, skill updates, certifications, work experience and admin job postings.</div>
            </div>
            {
                footerLinks.map((item, index) => <div  data-aos-offset="0"  data-aos="fade-up" key={index}>
                    <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
                    {
                        item.links.map((link, index) => <div key={index} className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">{link}</div>)
                    }
                </div>)
            }
        </div>
        <Divider className="bg-mine-shaft-800"/>
        <div className="bg-mine-shaft-950 text-center py-4 text-mine-shaft-300 text-sm">
            © {new Date().getFullYear()} PathHire. All Rights Reserved.
        </div>
    </div>:<></>
}
export default Footer;