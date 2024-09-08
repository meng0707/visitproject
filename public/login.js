// login.js
document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        localStorage.setItem('token', result.token); // เก็บ token
        window.location.href = '/dashboard.html'; // เปลี่ยนเส้นทางไปที่หน้า dashboard
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    }
});
