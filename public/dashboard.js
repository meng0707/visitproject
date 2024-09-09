document.getElementById('logout').addEventListener('click', () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // เปลี่ยนเส้นทางไปที่หน้า login
    window.location.href = '/index.html';
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
                        <p><strong>วันที่แจ้งซ่อม:</strong> ${new Date(report.createdAt).toLocaleString()}</p>
                    `;
                    reportList.appendChild(reportDiv);
                });
            } else {
                reportList.innerHTML = '<p>ไม่มีรายงานในขณะนี้</p>';
            }
        })
        .catch(error => console.error('Error fetching reports:', error));
});

// dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/reports');
        const reports = await response.json();

        const reportList = document.getElementById('reportList');
        reportList.innerHTML = reports.map(report => `
            <div class="report-item">
                <h3>${report.title}</h3>
                <p>${report.detail}</p>
                <p>Status: ${report.status}</p>
                <!-- Add a button to update status -->
                <button onclick="updateStatus('${report._id}', 'In Repair')">Mark as In Repair</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
    }
});

async function updateStatus(id, status) {
    try {
        const response = await fetch(`/api/reports/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            alert('Status updated successfully');
            location.reload(); // Reload the page to reflect the changes
        } else {
            alert('Failed to update status');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ในไฟล์ dashboard.js หรือไฟล์ที่ทำงานหลังจากการล็อกอิน
fetch('/index', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
})
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            if (data.role === 'Technician') {
                window.location.href = 'dashboardedit.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        } else {
            alert('Login failed');
        }
    });

// dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/reports');
        const reports = await response.json();

        const reportList = document.getElementById('reportList');
        reportList.innerHTML = reports.map(report => `
            <div class="report-item">
                <h3>${report.title}</h3>
                <p>${report.detail}</p>
                <p>Status: ${report.status}</p>
                <!-- Add a button to update status -->
                <button onclick="updateStatus('${report._id}', 'In Repair')">Mark as In Repair</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
    }
});