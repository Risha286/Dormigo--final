function openPaymentMethod(method) {
    // Hide all tab contents
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    // Remove active class from all buttons
    var buttons = document.getElementsByClassName('tab-button');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }
    // Show the selected tab and add active class to the clicked button
    document.getElementById(method).style.display = 'block';
    event.currentTarget.classList.add('active');
}

// Initialize default tab
document.addEventListener('DOMContentLoaded', function () {
    openPaymentMethod('upi-qr');
});

function processTransaction(method) {
    let amount;
    if (method === 'upi') {
        const upiID = document.getElementById('upi-id').value.trim();
        amount = document.getElementById('upi-amount').value;
        if (!upiID && !amount) {
            alert('Please enter UPI ID or scan the QR code along with the amount.');
            return;
        }
    } else if (method === 'card') {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('card-expiry').value;
        const cvv = document.getElementById('card-cvv').value;
        amount = document.getElementById('card-amount').value;

        if (!cardNumber || !expiry || !cvv || !amount) {
            alert('Please fill in all card details along with the amount.');
            return;
        }
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Display success message
    document.getElementById('paid-amount').innerText = amount;
    document.getElementById('success-message').style.display = 'block';
    document.getElementById('upi-qr').style.display = 'none';
    document.getElementById('card').style.display = 'none';
}

function downloadReceipt() {
    alert('Receipt downloaded!');
    // You can implement actual receipt download logic here.
}