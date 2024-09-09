document.getElementById('logout').addEventListener('click', () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // เปลี่ยนเส้นทางไปที่หน้า login
    window.location.href = '/index.html';
});

// inventorylist.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/inventory');
        
        // ตรวจสอบว่า Response OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const inventoryItems = await response.json();
        
        // แสดงข้อมูลในหน้า
        const inventoryList = document.getElementById('inventoryList');
        inventoryList.innerHTML = '';

        inventoryItems.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('inventory-item'); // เพิ่มคลาส inventory-item

            div.innerHTML = `
                <h2>${item.productName}</h2>
                <p>ประเภทพัสดุ: ${item.category}</p>
                <p>จำนวน: ${item.quantity}</p>
                <p>วันที่เบิกพัสดุ: ${new Date(item.receivedDate).toLocaleDateString()}</p>
            `;
            inventoryList.appendChild(div);
        });

    } catch (error) {
        console.error('Error fetching inventory:', error);
        alert('Failed to load inventory data.');
    }
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // เปลี่ยนเส้นทางไปที่หน้า dashboard
});
