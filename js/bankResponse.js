"use strict"

function getSuccessfulHtml() {
    return `
    
<div class="bank-container success-background">
    <div class="bank-inset">
        <i class="bank-icon-size success-color fa fa-check-circle"></i>
        <div class="bank-message">
            <h1 class="success-color">تراکنش موفق</h1>
        </div>
        <div class="bank-details">
            <div>شماره صورتحساب:</div>
            <div>2</div>
            <div>تاریخ پرداخت:</div>
            <div>1403/10/17</div>
            <div>شماره کارت:</div>
            <div>606373********5411:</div>
            <div>هزینه تراکنش:</div>
            <div>269،000 تومان</div>
            <div>شماره پیگیری:</div>
            <div>sgllkjsdfliuwer</div>
        </div>
        <!-- <button class="sim-btn btn-new from-middle">
        پرداخت
    </button> -->
    </div>
</div>
        `
}
function getUnSuccessfulHtml() {
    return `
   <div class="bank-container un-success-background">
    <div class="bank-inset">
        <i class="bank-icon-size un-success-color fa fa-times-circle"></i>
        <div class="bank-message">
            <h1 class="un-success-color">تراکنش ناموفق</h1>
        </div>
        <div class="bank-details">
            <div>شماره صورتحساب:</div>
            <div>2</div>
            <div>تاریخ پرداخت:</div>
            <div>1403/10/17</div>
            <div>شماره پیگیری:</div>
            <div>sgllkjsdfliuwer</div>
        </div>
        <!-- <button class="sim-btn btn-new from-middle">
                پرداخت
            </button> -->
    </div>
    </div>
        `
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('The page has loaded!');
    const htmlStatus = document.getElementById('check-status');
    setTimeout(() => {
        console.log('please wait');

    }, 2000);
    const bankReponse = {
        isSuccess: true
    }
    htmlStatus.insertAdjacentHTML('beforeend', bankReponse.isSuccess ? getSuccessfulHtml() : getUnSuccessfulHtml())
    // axios.defaults.baseURL = 'https://130.185.75.117/KontoriNew';
    // const bankUrl = 'https://sep.shaparak.ir/OnlinePG/SendToken?token=';

});