axios.defaults.baseURL = 'https://130.185.75.117/KontoriNew';
const bankUrl = 'https://sep.shaparak.ir/OnlinePG/SendToken?token=';
const invoiceInfoAPI = 'V1/Pay/InvoiceInfo?id=';
const beforeCallAPI = 'V1/Pay/Saman?id=';

const getUrlParams = async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    return id;
}
const callBank = async () => {
    getUrlParams().then(async res => {
        const response = await axios.get(beforeCallAPI + res);
        window.location.href = `${bankUrl + response.data.token}`;
    })
}
document.addEventListener('click', function (event) {
    // Check if the clicked element matches our selector
    if (event.target.matches('#payment-button')) {
        callBank();
    }

});
async function callApiWithParams() {
    try {
        // Get parameters from URL
        const params = getUrlParams();
        params.then(async res => {
            if (!res) {
                // to hide scrollable header option for payment section and payment section itself, if no id is stablished
                document.querySelectorAll('#payment-method , #payments').forEach(el => {
                    el.style.display = 'none';
                });
                return;
            }

            let response = await axios.get(invoiceInfoAPI + res);
            response = response.data;
            document.getElementById('userData').innerHTML = `
            <tr>
											<td class="payment-table-td-title">نام کامل</td>
											<td class="payment-table-td" style="text-align: left;">${response.fullName}</td>
										</tr>
										<tr>
											<td class="payment-table-td-title">موبایل</td>
											<td class="payment-table-td" style="text-align: left;">${response.mobile}</td>
										</tr>
										<tr>
											<td class="payment-table-td-title">تاریخ صدور</td>
											<td class="payment-table-td" style="text-align: left;">${response.issueDate}</td>
										</tr>
										<tr>
											<td class="payment-table-td-title">مبلغ</td>
											<td class="payment-table-td" style="text-align: left;">${response.amount}</td>
										</tr>
										<tr>
											<td class="payment-table-td-title"></td>
											<td class="payment-table-td" style="text-align: left;">
												<button id="payment-button"
													class="sim-btn btn-payment">
													پرداخت
												</button>
											</td>
										</tr>
                                        `
            // Example API call with parameters
            // Replace with your actual API endpoint
            // const response = await axios.get(invoiceInfoAPI + params)

            // Log the response            
            const link = document.querySelector('[href="#payment-method"]');

            const previousActivelink = document.querySelector('[href="#home"]');
            previousActivelink.classList.remove('active');
            link.classList.add('active');
            link.href = '#payment-method';

            setTimeout(() => {
                link.click();
            }, 100);
        });

    } catch (error) {
        console.error("Error calling API:", error);
    }
}
document.addEventListener('DOMContentLoaded', callApiWithParams);