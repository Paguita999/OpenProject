function validationKey(){

    let key = document.querySelector('#apikey').value.trim();

    let isValid = true;

    if(key === ""){
        document.querySelector('#apikeyErr').innerHTML="Camp required";
        isValid = false;
    }

    if(isValid){
        window.location.href = "/frontend/inicio.html";
    }
}