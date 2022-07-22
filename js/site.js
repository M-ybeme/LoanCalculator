//driver function
function getValues(){
    //get  values the user entered
    let userLoan = document.getElementById("userLoan").value;
    let userTerm = document.getElementById("userTerm").value;
    let userRate = document.getElementById("userRate").value;

    //parse int
    let loan = parseInt(userLoan);
    let term = parseInt(userTerm);
    let rate = parseFloat(userRate);

    let payments = generatePayments(loan, term, rate);
    displayPayments(payments)
}


function generatePayments(loan, term, rate){
    //what are the imputs for this function?
    //what are the calculations?

    let totalmonthly = ((loan) * (rate / 1200)) / (1 - (Math.pow((1 + rate / 1200), -term)));
    

    //should return array of payment objects(JSON?)
    let payments = [];
    for (let index = 0; index < term; index++) {
        let previousBal = loan;
        if (index != 0) {
            previousBal = payments[index -1].balance
            }
        let interestPay = previousBal * rate / 1200;
        let princPay = totalmonthly - interestPay;
        let remainingBal = previousBal - princPay;
        let totalInterest = interestPay;
        if (index != 0) {
            totalInterest += payments[index - 1].totalInterest;
        }

        let monthPay = {
            month:index+1,
            payment: totalmonthly,
            principal: princPay,
            interest: interestPay,
            totalInterest: totalInterest,
            balance: remainingBal
        }
        payments.push(monthPay);
    }
    return payments
}


function displayMonthPayment(loan, term, rate){
    const numberFormatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    

    let totalmonthly = ((loan) * (rate / 1200)) / (1 - (Math.pow((1 + rate / 1200), -term)));
    let remainingBal = loan;
    let interestPay = remainingBal * rate / 1200;
    let totalInterest = (rate / 100) * loan;
    let princPay = totalmonthly - interestPay;
    let cost = loan + totalInterest;

    let viewPayment = document.getElementById("totalMonthlyPayment");
    let viewPrincipal = document.getElementById("totalPrincipal");
    let viewInterest = document.getElementById("totalInterest");
    let viewTotalCost = document.getElementById("totalCost");

    viewPayment.innerHTML = numberFormatter.format(totalmonthly);
    viewPrincipal.innerHTML = numberFormatter.format(princPay);
    viewInterest.innerHTML = numberFormatter.format(totalInterest);
    viewTotalCost.innerHTML = numberFormatter.format(cost);
    

}


function displayPayments(payments) {
    let template = document.getElementById("tempData");
    let body = document.getElementById("body");

    body.innerHTML = "";

    payments.forEach(element => {
        let node = document.importNode(tempData.content, true)
        let item = node.querySelectorAll("td");

        item[0].textContent = element.month;
        item[1].textContent = element.payment;
        item[2].textContent = element.principal;
        item[3].textContent = element.interest;
        item[4].textContent = element.interest;
        item[5].textContent = element.balance;
        body.appendChild(node);
    });

}