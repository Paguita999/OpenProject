 document.querySelector('#apiform').addEventListener('submit', async (e) => {
        e.preventDefault();
        const key = document.querySelector('#apikey').value.trim();
        const errorElement = document.querySelector('#apikeyErr');

        if (!key) {
            errorElement.innerHTML = "Camp required";
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v3/users', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa('apikey:' + key),
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:8080'
                }
            });

            if (response.ok) {
                localStorage.setItem("apikey", key);
                window.location.href = '/html/inicio.html';
            } else {
                errorElement.innerHTML = 'Invalid key';
            }
        } catch (err) {
            console.error('Connection error:', err);
            errorElement.innerHTML = 'Server error connection';
        }
    });