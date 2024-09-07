document.getElementById('logout').addEventListener('click', () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // เปลี่ยนเส้นทางไปที่หน้า login
    window.location.href = '/login.html';
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/report', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // เพิ่ม token ไปใน header
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // ตรวจสอบข้อมูลที่ได้รับจาก API
            const reportList = document.getElementById('reportList');
            if (data.length > 0) {
                data.forEach(report => {
                    const reportDiv = document.createElement('div');
                    reportDiv.classList.add('report-item');
                    reportDiv.innerHTML = `
                        <h3>${report.title}</h3>
                        <p><strong>รายละเอียด:</strong> ${report.detail}</p>
                        <p><strong>สถานที่:</strong> ${report.location}</p>
                        <p><strong>สถานะ:</strong> ${report.status}</p>
                        <p><strong>รายงานเมื่อ:</strong> ${new Date(report.report_at).toLocaleString()}</p>
                    `;
                    reportList.appendChild(reportDiv);
                });
            } else {
                reportList.innerHTML = '<p>ไม่มีรายงานในขณะนี้</p>';
            }
        })
        .catch(error => console.error('Error fetching reports:', error));
});
