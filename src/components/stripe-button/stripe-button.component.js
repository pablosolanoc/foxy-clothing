import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JNn1yJ8FX72hgGGReBoK1FmM3gJgxrMrKlzYzrWFwd7vG9gFti2QcikHFiY0oatfPjithXb9VsnjixQUqVqmMeO00A9EaQiED';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label="Pay Right Now"
            name="CRWN Clothing Ltd."
            billingAddress
            ShippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;