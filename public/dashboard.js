document.getElementById('logout').addEventListener('click', () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // เปลี่ยนเส้นทางไปที่หน้า login
    window.location.href = '/login.html';
});


