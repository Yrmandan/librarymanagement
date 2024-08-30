document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const message = await response.text();
        alert(message);

        if (response.ok) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
}
)



document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        let message = await response.text()
        alert(message)
        if (response.ok) {
            window.location.href = "/"
        }
    } catch (error) {
        console.log('Login error:', error);

    }
}
)
document.getElementById('adminForm')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    try {
        const response = await fetch('/auth/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        let message = await response.text()
        alert(message)
        if (response.ok) {
            window.location.href = "/"
        }
    } catch (error) {
        console.log('Login error:', error);

    }
}
)

