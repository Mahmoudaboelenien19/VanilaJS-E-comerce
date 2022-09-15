const btn=document.querySelector("button")
const user=document.querySelector('[type="text"]')
const email=document.querySelector('[type="e-mail"]')
const password=document.querySelector('[type="password"]')




btn.onclick=(e)=>{
	e.preventDefault()
	if(user.value==''||email.value==''||password.value=='')
	{return ;}
else{
	
	localStorage.setItem("name",user.value)
	localStorage.setItem("email",email.value)
	localStorage.setItem("password",password.value)
		setTimeout(()=>{
	window.location ="index.html"	;

	},1500);
	
		

	};

};