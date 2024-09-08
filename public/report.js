document.getElementById('logout').addEventListener('click', () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // เปลี่ยนเส้นทางไปที่หน้า login
    window.location.href = '/index.html';
});

document.getElementById('repairForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    const title = document.getElementById('title').value;
    const detail = document.getElementById('detail').value;
    const location = document.getElementById('location').value;

    console.log({ title, detail, location }); // ตรวจสอบข้อมูลที่ส่ง

    const requestData = {
        title,
        detail,
        location
    };

    try {
        const response = await fetch('/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // ส่ง token ใน header
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            alert('ส่งคำร้องเรียบร้อยแล้ว');
            document.getElementById('repairForm').reset(); // รีเซ็ตฟอร์มหลังส่งข้อมูล
        } else {
            const errorData = await response.json();
            alert(`เกิดข้อผิดพลาดในการส่งคำร้อง: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งคำร้อง');
    }
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // เปลี่ยนเส้นทางไปที่หน้า dashboard
});
