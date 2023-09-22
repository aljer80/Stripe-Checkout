# Stripe-Checkout
Payment with Stripe checkout
https://github.com/aljer80/Stripe-Checkout.git 

# Beskrivning av projetet
I det här projektet skapar man en enkel webbshop där det går att lägga en order och 
genomföra en betalning med integration med Stripe. Fokus för projektet är integrationen med Stripe, vilket innebär att den här webbshopen inte har all funktionell en webshop har. Fokus har varit integrationen för Stripe och att följa kravspecifikationen. 

Följande funktionalitet finns:
- Man kan registrera sig som användare,
- Användaren registreras hos Stripe,
- Man kan logga in,
- Man kan placera ordrar (kräver inloggning)
- Man kan hämta sina tidigare ordrar (kräver inloggning)
- Man kan lägga varor i en varukorg
- Man kan genomföra ett köp (via Stripe checkout)

Till projektet används en NoSQL-databas. Användare lagras i en JSON-FIL, och ordrar lagras i en annan JSON-FIL: users.json, orders.json. 

Inloggningen hanteras med cookies, och det finns i backend stöd för att lägga till ytterligare funktionalitet som att lägga till admin. 

Användare och ordrar hanteras i appen. Alla produkter hanteras genom Stripe. Det finns stöd för rabattkoder, och anger du koden FALL23 i checkout får du 15% rabatt på ditt köp. 

Länk till giltiga testkort på Stripe: https://stripe.com/docs/testing. 

# Krav som har uppfyllts:
Alla krav för G och VG är uppfyllda

Krav för G:
1. Uppgiften lämnas in i tid.
2. Produkter ska listas på en sida. 
3. Produkter som visas och köps skall hämtas ifrån Stripe.
4. Det ska gå att lägga till produkter i en kundvagn.
5. Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
6. Man skall kunna registrera sig som en användare i webbshoppen. Detta skall resultera 
i att en ”Customer” skapas i Stripe och användaren sparar i en JSON-fil. (samtliga 
lösenord skall sparas hashade).
7. Man skall kunna logga in som kund. Den inloggade kunden (som även är sparad i 
Stripe) skall användas vid placering av order.
8. Man skall inte kunna placera en order om man inte är inloggad

Krav för VG:
1. Alla punkter för godkänt är uppfyllda. 
2. Det skall gå att ange en rabattkod för att få rabatt på sitt köp.
3. Man skall som inloggad kunna se sina lagda ordrar.
4. Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
5. Ordern får inte läggas utan genomförd betalning.

# Beskrivning av hur projektet byggs och startas: 
# Build Stripe-Checkout 
Clone the repository from GitHub.com to your local computer by following these steps:
1. Navigate (on GitHub) to the main page of the repository: https://github.com/aljer80/Stripe-Checkout.git  
2. Above the list of files, click <>Code.
3. Copy the URL for the repository using HTTPS (HTTPS is pre-selected).
4. Open Git Bash.
5. Change the current working directory to the location where you want the cloned directory.
6. Type git clone, and then paste the copied URL.
7. Press Enter to create your local clone. 

You also need to create a .env-file and add a STRIPE_SECRET_KEY(variable) + a value (your secret key) and a PORT(variable) + a value (3000) in the .env-file. You get the secret key from Stripe when you have created an account there.

# Run Stripe-Checkout
Open a terminal. Type 'cd server' to navigate to the server folder. Type 'npm install' to install node_modules in the server folder. Type 'nodemon server.js' to start the server.

Open a new terminal. Type 'cd client' in the terminal to navigate to the client folder. Type 'npm install' to install node_modules in the client folder. Type 'npm run dev' to start the development server.

Now you're up and running! To view it in your browser follow ONE of the steps below:
- Press the key 'o'
- Click on the link in the terminal
Open a browser and navigate to http://localhost:5173