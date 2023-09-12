import { useEffect } from "react";

function Confirmation() {

    const [isPaymentVerified, setIsPaymentVerified]= useState(false)
    
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
            setIsPaymentVerified(true)
            localStorage.removeItem("session-id");
            } else {
                setIsPaymentVerified(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        verifyPayment()
    }, []);

    
    return isPaymentVerified ? ( 
        <div>Tack för ditt köp 
            <p>Tack för ditt köp! <br />
            En orderbekräftelse har skickats till din E-post. 
            Har du någon fråga är du välkommen att kontakta oss
            på <a href="mailto:alexandra.jernberg@medieinstitutet.se">info@padelshoppen.se</a>
            </p>
        </div>
        ) : (
        <h1>Något gick fel</h1>
        ) 

}
  
  export default Confirmation;

