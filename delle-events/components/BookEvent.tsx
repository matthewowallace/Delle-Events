'use client'
import {useState} from "react";
import { Button } from "@/components/ui/button";
import {CompassIcon} from "@/components/CompassIcon";

const BookEvent = () => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }

    return (
        <div id={"book-event"}>
            {
                submitted ?(<p>Thank you for booking an event</p>) : (
                    <form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Your email address" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <Button variant="outline" size="lg" id="submit">
                            <a>
                                <span>Submit</span>
                            </a>
                        </Button>
                    </form>
                )
            }
        </div>
    )
}
export default BookEvent
