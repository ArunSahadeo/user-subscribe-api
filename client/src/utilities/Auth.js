class Auth {

    async verifyLogin (username, password) {
        let url =  '/api/superuser';

        const searchParams = {
            username: username,
            password: password 
        };

        if (Object.keys(searchParams).length > 0) {
            url += '?';

            Object.keys(searchParams).forEach(key => {
                let index = Object.keys(searchParams).indexOf(key);
                let keyValuePair = (key + '=' + searchParams[key]);

                if (index != (Object.keys(searchParams).length - 1)) {
                    keyValuePair += '&';
                }

                url += keyValuePair;      
            });
        }

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const authenticatedUser = await response.json();

        if (authenticatedUser) {
            const username = authenticatedUser['fulfillmentValue']['username'];
            localStorage.setItem('user-authenticated', true);
            localStorage.setItem('username', username);
            this.handleRedirect();
        }
    }

    handleRedirect() {
        localStorage.setItem('logged-in', true);
        window.location = '/admin/dashboard';
    }
}


export default Auth;
