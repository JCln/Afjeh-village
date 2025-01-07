axios.defaults.baseURL = 'https://130.185.75.117/KontoriNew';
const bankUrl = 'https://sep.shaparak.ir/OnlinePG/SendToken?token=';

async function getPayment() {
    try {
        const response = await axios.get('V1/Pay/Saman?resNum=54321');
        console.log(response);
        window.location.href = `${bankUrl + response.data.token}`;
    } catch (error) {
        console.error(error);
    }

}