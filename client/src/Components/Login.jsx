import React, { useState } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import "../assets/css/login.css";

function LoginPage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    //LOGINFORMULÄRET
    //State för inloggningsformuläret
    const [loginData, setLoginData] = useState({
        loginEmail: "",
        loginPassword: "",
    });

    // Funktion som hanterar ändringar i formuläret
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
        ...loginData,
        [name]: value,
        });
    };

    //Funktion som anropas när användaren skickar loginformuläret
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(loginData);
        // Skicka inloggningsdata till backend för inloggning
        const loginDataToSend = {
            username: loginData.loginEmail,
            password: loginData.loginPassword,
        };
        
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDataToSend),
            });
           
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Inloggningen misslyckades: ${errorData}`);
            }
        
            // Logik för vad som ska göras om inloggningen lyckades
            const user = await response.json();
            Cookies.set('userId', user.stripeCustomerId); // Användarens ID som sessionscookie
            console.log('userId: ' +user.stripeCustomerId);
            setLoginData({
                loginEmail: "",
                loginPassword: "",
            });
            setIsLoggedIn(true);
       
        } catch (error) {
            console.error("Fel vid inloggning", error.message);
        }
    };

    
    //REGISTRERINGSFORMULÄRET
    //State för för registreringsformuläret
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        });

    // Funktion som hanterar ändringar i formuläret
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
        ...registerData,
        [name]: value,
        });
    };

    //Funktion som anropas när användaren skickar registreringsformuläret
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log(registerData);
        // Skicka registreringsdata till backend för att skapa ett konto
        const registerDataToSend = {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            username: registerData.username,
            password: registerData.password,
        };
        
        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerDataToSend),
            });
            
            if (!response.ok) {
            throw new Error("Registrering misslyckades:", response.status, response.statusText);
            }
            // Hantera registreringen och användarinformation från svaret här!
            //Här kan man lägga in logik för vad som ska göras om registreringen lyckades
            setRegisterData({
                firstName: "",
                lastName: "",
                username: "",
                password: "",           
            });

            setIsLoggedIn(false);

        } catch (error) {
            console.error(error.message);
        }
    };


  return (
    <div>
        <article> 
            <section>
                <h1>Inloggning</h1>
                <h3>Redan kund?</h3>
                <p>Logga in här:</p>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                    <label htmlFor="loginEmail">E-post</label>
                    <input
                        type="email"
                        id="loginEmail"
                        name="loginEmail"
                        value={loginData.loginEmail}
                        onChange={handleLoginChange}
                        required
                    />
                    </div>
                    
                    <div>
                    <label htmlFor="loginPassword">Lösenord</label>
                    <input
                        type="password"
                        id="loginPassword"
                        name="loginPassword"
                        value={loginData.loginPassword}
                        onChange={handleLoginChange}
                        required
                    />
                    </div>

                    <div>
                        <button>Logga in</button>
                        {/* <NavLink to="/products">
                        <button>Logga in</button>
                        </NavLink> */}
                    </div>
                </form>
            </section>
        </article>

        <article> 
            <section>
            <h1>Registrering</h1>
            <h3>Är du ny?</h3>
            <p>Skapa nytt konto här:</p>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                <label htmlFor="firstName">Förnamn</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    required
                />
                </div>

                <div>
                <label htmlFor="lastName">Efternamn</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    required
                />
                </div>

                <div>
                <label htmlFor="email">E-post</label>
                <input
                    type="email"
                    id="email"
                    name="username"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                />
                </div>

                <div>
                <label htmlFor="password">Lösenord</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                />
                </div>

                <div>
                    <button type="submit">Registrera</button>
                    {/* <NavLink to="/products">
                    <button>Registrera</button>
                    </NavLink> */}
                </div>
            </form>
            </section>
        </article>
    </div>
  );
}

export default LoginPage;
