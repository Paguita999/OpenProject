function validationKey() {

    document.querySelector('#apiform').addEventListener('submit', async (e) => {
        e.preventDefault();

        const key = document.querySelector('#apikey').value.trim();

        if (key === "") {

            document.querySelector('#apikeyErr').innerHTML = "Camp required";

        } else {

            try {
                const response = await fetch('https://localhost:8080/api/v3/users', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + btoa('apikey:' + key),
                        'Origin': 'http://localhost:8080',


                    },
                    body: JSON.stringify({key})
                });

                const result = await response.json();

                if (response.ok) {

                    sessionStorage.setItem("apikey", key);

                    window.location.href = '../../frontend/inicio.html';
                    
                } else {
                    document.querySelector('#apikeyErr').textContent = 'Invalid key';
                }
            } catch (err) {
                console.error('Connection error:', err);
                document.querySelector('#apikeyErr').textContent = 'Server error connection';
            }
        }
    });
}


