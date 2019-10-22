Stripe.setPublishableKey('pk_test_8S9zPDVUxhsobhfptBcHvz5C00dHZfeaQU');

$form.submit = $(function (event) {
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        name: $('#address_zip').val()
    }.stripeResponseHandler)
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        $form.find('#charge-errors').text(response.error.message)
        $form.find('#Scharge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);

    }
    else {
        var token = response.id;
        $form.append($('<input type="hidden" name="stripeToken />').val(token));
        $form.get(0).submit();
    }

}