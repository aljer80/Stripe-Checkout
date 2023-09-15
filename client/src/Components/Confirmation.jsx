import { useState, useEffect } from "react";

function Confirmation() {

    const [isPaymentVerified, setIsPaymentVerified]= useState(false)
    
    useEffect(() => {
        const sessionId = localStorage.getItem("session-id")

        const verifyPayment = async () => {
            try {
                const sessionId = localStorage.getItem("session-id");
                const response = await fetch("http://localhost:3000/verify-session", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",                   
                },
                body: JSON.stringify({ sessionId }),
            });
    
                const { verified } = await response.json();
                
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

        verifyPayment()
    }, []);

    
    return isPaymentVerified ? ( 
        <div>
            <p>Tack för ditt köp! <br />
            En orderbekräftelse har skickats till din E-post. 
            Vid frågor vänligen kontakta oss
            på <a href="mailto:alexandra.jernberg@medieinstitutet.se">info@padelshoppen.se</a>
            </p>
        </div>
        ) : (
        <h1>Något gick fel med betalningen</h1>
        ) 

}
  
  export default Confirmation;

