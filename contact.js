"use strict";

/* ========= EMAILJS CONTACT FORM ========= */

document.addEventListener("DOMContentLoaded", function () {

const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");
const submitBtn = document.querySelector(".form-submit");

if(!form) return;

form.addEventListener("submit", function(e){

e.preventDefault();

submitBtn.disabled = true;
submitBtn.innerText = "Sending...";

emailjs.sendForm(
"service_4t8ryix",
"template_132q69l",
form
)

.then(function(){

status.className = "form-status success";
status.innerText = "Message sent successfully!";

submitBtn.disabled = false;
submitBtn.innerText = "Send Message →";

form.reset();

})

.catch(function(error){

console.error(error);

status.className = "form-status error";
status.innerText = "Failed to send message.";

submitBtn.disabled = false;
submitBtn.innerText = "Send Message →";

});

});

});


/* ========= UPI COPY BUTTON ========= */

document.addEventListener("DOMContentLoaded", function(){

const btn = document.querySelector(".upi-copy-btn");
const upi = document.querySelector(".upi-id");

if(!btn || !upi) return;

btn.addEventListener("click", function(){

navigator.clipboard.writeText(upi.innerText);

btn.innerText = "Copied!";

setTimeout(function(){
btn.innerText = "Copy UPI ID";
},2000);

});

});


/* ========= EMAIL CLICK ========= */

document.addEventListener("DOMContentLoaded", function(){

const emailBox = document.querySelector("[data-email]");

if(!emailBox) return;

emailBox.addEventListener("click", function(){

const email = emailBox.getAttribute("data-email");
window.location.href = "mailto:" + email;

});

});