const initStripe = () => {
    const Stripe = require("stripe");
    return Stripe(process.env.STRIPE_SECRET_KEY);
};

module.exports = { initStripe };

//i filen man tar in Stripe:
// const { initStripe } = require("../path till stripe");
// const stripe = initStripe();
