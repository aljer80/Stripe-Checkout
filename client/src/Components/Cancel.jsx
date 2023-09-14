import React from 'react'

function Cancel() {
  return (
    <div>
        <h3>Köpet avbröts pga att du lämnade Stripe checkout</h3>
        <p>Avbröt du köpet av misstag? Här är en länk tillbaka till webbshopen</p>
        <NavLink to={"/"}>Till Startsidan</NavLink>
    </div>
  )
}

export default Cancel