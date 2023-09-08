

//FUNKTION FÖR ATT PLACERA ORDER
//if som kollar om man är inloggad. Om inloggad körs koden:
//async function createOrder
     //get user
     //get product (för alla produkter i kundvagnen)
    //skicka order till Stripe



//FUNKTION FÖR ATT KUNNA SE SINA LAGDA ORDRAR
async function getOrders (req, res, next) {
    try {
        //const allOrders = hämta alla ordrar och populera med customer?
        if (allOrders.length == 0) {
            res.status(404).json("No orders found");
        } else {
            res.status(200).json(allOrders);
        }      
    } catch (error) {
            res.status(500).json();
        }
}


  