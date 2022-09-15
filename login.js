const btn=document.querySelector("button")
const user=document.querySelector('[type="text"]')
const password=document.querySelector('[type="password"]')




btn.onclick=(e)=>{
	e.preventDefault()
	if(user.value==''||password.value=='')
	{return ;}

	if(user.value==localStorage.name&&password.value==localStorage.password)
	{		setTimeout(()=>{
	window.location ="index.html"	;
	
	},1500);
	
	
	};

};