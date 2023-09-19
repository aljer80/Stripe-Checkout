import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Confirmation() {

    const [isPaymentVerified, setIsPaymentVerified]= useState(false)

    const verifyPayment = async () => {
        try {
            const sessionId = localStorage.getItem("session-id"); // hämtar ut sessions:id
            //anropar servern och skickar med sessions id:t
            const response = await fetch("http://localhost:3000/api/checkout/verify-session", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",                   
            },
            body: JSON.stringify({ sessionId }),
        });

            const { verified } = await response.json();  //kollar vad servern svarar
            
            if(verified) {
            setIsPaymentVerified(true);
            localStorage.removeItem("session-id");
            } else {
                setIsPaymentVerified(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        verifyPayment();
    }, []);


    async function logOut() {
        try {
            const userId = Cookies.get('userId');
            const response = await fetch("http://localhost:3000/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }), // Skickar med användarens ID till backenden
            });
            if (!response.ok) {
                throw new Error("Utloggningen misslyckades:", response.status, response.statusText);
            }
            Cookies.remove('userId');
            
        } catch (error) {
            console.error(error.message);
        }
    }
    
    

    return isPaymentVerified ? ( 
        <div className="payment_verified-div">
            <h1>Tack för ditt köp!</h1>
            <h3> En orderbekräftelse har skickats till din E-post. <br />
            Vid frågor vänligen kontakta oss
            på <a href="mailto:alexandra.jernberg@medieinstitutet.se">info@padelmania.se</a>
            </h3>
            <br />
            <div className="button-div">
                <button onClick={logOut}>Logga ut</button> 
            </div>
            
        </div>
        ) : (
        <div className="payment_verified-div">
            <h1>Ditt köp blev inte slutfört, <br/> Var god försök igen!</h1> <br/>
            <h3>Kontakta vår support om problemet kvarstår.</h3> <br />
            <h3> Kundtjänstens öppettider är: mån-fre: 9-20 | lör-sön: 10-18 </h3>
            <h3>Telefon: 0771-42 42 42 <br/>
            E-post:<a href="mailto:alexandra.jernberg@medieinstitutet.se">kundtjanst@padelmania.se</a></h3><br/>            
        </div>
    ); 

}
  
  export default Confirmation;

