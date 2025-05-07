function generateAgreement() {
    const ownerName = document.getElementById('owner-name').value;
    const tenantName = document.getElementById('tenant-name').value;
    const propertyAddress = document.getElementById('property-address').value;
    const rentAmount = document.getElementById('rent-amount').value;
    const duration = document.getElementById('duration').value;
    const paymentDate = document.getElementById('payment-date').value;

    const ownerSignatureFile = document.getElementById('owner-signature').files[0];
    const tenantSignatureFile = document.getElementById('tenant-signature').files[0];

    if (ownerSignatureFile && tenantSignatureFile) {
        const readerOwner = new FileReader();
        const readerTenant = new FileReader();

        readerOwner.onload = function (e) {
            const ownerSignature = e.target.result;

            readerTenant.onload = function (e) {
                const tenantSignature = e.target.result;

                const agreementContent = `
                    <div class="agreement">
                        <h1>Rental Agreement</h1>
                        <p><span>Date:</span> ${new Date().toLocaleDateString()}</p>
                        <p><span>Owner's Name:</span> ${ownerName}</p>
                        <p><span>Tenant's Name:</span> ${tenantName}</p>
                        <p><span>Property Address:</span> ${propertyAddress}</p>
                        <p><span>Rent Amount:</span> ₹${rentAmount} per month</p>
                        <p><span>Duration:</span> ${duration} months</p>
                        <p><span>Payment Date:</span> ${paymentDate}</p>
                        <p>This rental agreement is between the above mentioned Owner and Tenant for the stated property and terms. Both parties agree to adhere to the terms of the rental.</p>

                        <div class="signature-section">
                            <div class="signature">
                                <p>Owner's Signature</p>
                                <img src="${ownerSignature}" alt="Owner's Signature">
                            </div>
                            <div class="signature">
                                <p>Tenant's Signature</p>
                                <img src="${tenantSignature}" alt="Tenant's Signature">
                            </div>
                        </div>
                    </div>
                `;

                const newWindow = window.open('', '_blank');
                newWindow.document.write(`
                    <html>
                        <head>
                            <title>Dormigo Rental Agreement</title>
                            <style>
                                body {
                                    font-family: 'Times New Roman', Times, serif;
                                    margin: 20px;
                                }
                                .agreement {
                                    margin: 20px;
                                    padding: 20px;
                                    border: 1px solid #000;
                                    border-radius: 5px;
                                }
                                .agreement h1 {
                                    text-align: center;
                                    font-size: 24px;
                                    text-decoration: underline;
                                }
                                .agreement p {
                                    font-size: 16px;
                                    line-height: 1.8;
                                }
                                .agreement .signature-section {
                                    display: flex;
                                    justify-content: space-between;
                                    margin-top: 30px;
                                }
                                .signature img {
                                    width: 200px;
                                    border: 1px solid #000;
                                }
                            </style>
                        </head>
                        <body>
                            ${agreementContent}
                        </body>
                    </html>
                `);

                newWindow.document.close();

                document.getElementById('success-message').style.display = 'block';
                document.getElementById('download-agreement').style.display = 'block';
            };
            readerTenant.readAsDataURL(tenantSignatureFile);
        };
        readerOwner.readAsDataURL(ownerSignatureFile);
    }
}

function downloadAgreement() {
    const agreementContent = document.querySelector('.agreement').outerHTML;
    const blob = new Blob([agreementContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Rental_Agreement.html';
    link.click();
}