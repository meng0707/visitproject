document.getElementById('logout').addEventListener('click', () => {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // เปลี่ยนเส้นทางไปที่หน้า login
    window.location.href = '/index.html';
});

// ตัวเลือกสำหรับพัสดุตามประเภท
const productOptions = {
    'ไฟฟ้า': [
        'สายไฟ',
        'สวิตช์',
        'เบรกเกอร์',
        'ท่อหุ้มสายไฟ',
        'หลอดไฟ',
        'เทปพันสายไฟ'
    ],
    'ประปา': [
        'ท่อ PVC/PE',
        'ข้อต่อท่อ',
        'วาล์ว',
        'ปะเก็น',
        'เทปพันเกลียว',
        'ท่อเหล็ก',
        'ท่อทองแดง',
        'ปั๊มน้ำ',
        'ฟิลเตอร์'
    ],
    'อาคาร': [
        'สีทาบ้าน',
        'ปูนซีเมนต์',
        'กระเบื้อง',
        'กาวติดกระเบื้อง',
        'ปะเก็น',
        'สกรู',
        'ไม้เทียมน',
        'น้ำยาทำความสะอาด'
    ]
};

// ฟังก์ชันสำหรับอัปเดตตัวเลือกสินค้า
function updateProductOptions(category) {
    const productSelect = document.getElementById('productName');
    productSelect.innerHTML = ''; // เคลียร์ตัวเลือกเก่า

    if (category in productOptions) {
        productOptions[category].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            productSelect.appendChild(optionElement);
        });
    }
}

// ฟังก์ชันจัดการการส่งฟอร์ม
document.getElementById('inventoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const receivedDate = new Date().toISOString(); // บันทึกเวลาเบิกอัตโนมัติ

    const requestData = { category, productName, quantity, receivedDate };

    try {
        const response = await fetch('/api/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('ส่งรายงานเรียบร้อยแล้ว');
        } else {
            console.error('Server Response:', result);
            alert('Error: ' + (result.error || 'Unknown error occurred'));
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งรายงาน');
    }
});


// อัปเดตตัวเลือกสินค้าเมื่อเลือกประเภท
document.getElementById('category').addEventListener('change', (e) => {
    const category = e.target.value;
    updateProductOptions(category);
});
