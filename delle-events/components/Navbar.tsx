'use client'
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {CompassIcon} from "@/components/CompassIcon";

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href='/' className={"logo"}>
                    <Image src="/icons/logo.png" alt={"logo"} width={"24"} height={"24"}/>

                    <p>DevEvent</p>
                </Link>
                <ul>
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/about'>About</Link></li>
                    <li><Link href='/events'>Events</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                    <li>
                        <Button variant="outline" size="lg" onClick={() => alert("New Branch")} id={"explore-btn"} >
                        <a href="#events">
                            <span>Explore Events</span>
                            <CompassIcon size={24} className="inline-block justify-center" />
                        </a>
                         </Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar
