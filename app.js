// listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  // hide results
  document.getElementById('results').style.display='none';


    // show loader
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults,2000);
    e.preventDefault();
});

//calculate results
function calculateResults(){
    
    // console.log('calculating........');

    // UI Vars
    const amount=  document.getElementById('amount');
    const interest= document.getElementById('interest');
    const years= document.getElementById('years');
    const monthlypayment= document.getElementById('monthly-payment');
    const totalpayment= document.getElementById('total-payment');
    const totalinterest= document.getElementById('total-interest');

    // Calculation
    const principal=parseFloat(amount.value);
    const calculatedInterest=parseFloat(interest.value) /100 / 12;
    const calculatedpayments=parseFloat(years.value)* 12;

    // Calculate monthly payments
    const x=Math.pow(1+calculatedInterest,calculatedpayments);
    const monthly=(principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlypayment.value=monthly.toFixed(2);
        totalpayment.value=(monthly*calculatedpayments).toFixed(2);
        totalinterest.value=((monthly * calculatedpayments)-principal).toFixed(2);
        // show results
        document.getElementById('results').style.display='block';

        //hide loader
        document.getElementById('loading').style.display='none';


    }
    else{
         showError('please check your numbers');
    }
}
function showError(error){

    // hide results
    document.getElementById('results').style.display='none';

    //hide loader
    document.getElementById('loading').style.display='none';
    // create a div
    const errorDiv= document.createElement('div');
    errorDiv.className='alert alert-danger';

    // get elements
    const card= document.querySelector('.card');
    const heading= document.querySelector('.heading');
    

    // create a textnode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert before heading
    card.insertBefore(errorDiv,heading);


}
setTimeout(clearError,3000);

function clearError(){
     document.querySelector('.alert').remove();
}