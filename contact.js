'use strict';

/* ==============================
   CONTACT FORM + EMAILJS
============================== */

(function initContactForm(){

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');
const submitBtn = document.querySelector('.form-submit');

if(!form) return;

form.addEventListener('submit', async (e)=>{

e.preventDefault();

/* validation */

const required = form.querySelectorAll('[required]');
let valid = true;

required.forEach(field=>{
field.classList.remove('error');

if(!field.value.trim()){
field.classList.add('error');
valid=false;
}

});

const emailField = form.querySelector('[type="email"]');

if(emailField){
const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(emailField.value)){
emailField.classList.add('error');
valid=false;
}
}

if(!valid){
showStatus('error','⚠ Please fill all fields correctly.');
return;
}

/* loading */

const original = submitBtn.innerHTML;
submitBtn.innerHTML="Sending...";
submitBtn.disabled=true;

try{

await emailjs.sendForm(
"service_4t8ryix",
"template_132q69l",
form,
"q8I2Du5DDRbzjVnhH"
);

submitBtn.innerHTML=original;
submitBtn.disabled=false;

showStatus('success',"✓ Message sent successfully!");
form.reset();

}catch(err){

submitBtn.innerHTML=original;
submitBtn.disabled=false;

showStatus('error',"⚠ Failed to send message.");
console.error(err);

}

});


function showStatus(type,msg){

if(!status) return;

status.className=`form-status ${type}`;
status.textContent=msg;
status.style.display="block";

setTimeout(()=>{
status.style.display="none";
},5000);

}

})();


/* ==============================
   EMAIL CLICK
============================== */

(function(){

const emailCard=document.querySelector('[data-email]');

if(!emailCard) return;

emailCard.addEventListener('click',()=>{
const email=emailCard.dataset.email;
window.location.href=`mailto:${email}`;
});

})();


/* ==============================
   DISCORD CLICK
============================== */

(function(){

const discord=document.querySelector('.purple-icon');

if(!discord) return;

discord.addEventListener('click',()=>{
window.open("https://discord.gg/8BrMcHVp","_blank");
});

})();