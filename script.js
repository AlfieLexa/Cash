let totalPrice = 0;

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (itemName && itemPrice && itemQuantity) {
        const totalItemPrice = itemPrice * itemQuantity;

        const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
        const newRow = cartTable.insertRow();

        const nameCell = newRow.insertCell(0);
        const priceCell = newRow.insertCell(1);
        const quantityCell = newRow.insertCell(2);
        const totalCell = newRow.insertCell(3);
        const actionCell = newRow.insertCell(4);

        nameCell.textContent = itemName;
        priceCell.textContent = `Rp ${itemPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        quantityCell.textContent = itemQuantity;
        totalCell.textContent = `Rp ${totalItemPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => removeItem(newRow, totalItemPrice);
        actionCell.appendChild(deleteButton);

        totalPrice += totalItemPrice;
        document.getElementById('total-price').textContent = totalPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-quantity').value = '1';
    } else {
        alert('Silakan masukkan nama, harga, dan jumlah barang.');
    }
}

function removeItem(row, totalItemPrice) {
    const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    cartTable.deleteRow(row.rowIndex - 1); // rowIndex starts from 1 for tbody rows

    totalPrice -= totalItemPrice;
    document.getElementById('total-price').textContent = totalPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateChange() {
    const amountReceived = parseFloat(document.getElementById('amount-received').value);
    if (amountReceived && amountReceived >= totalPrice) {
        const change = amountReceived - totalPrice;
        document.getElementById('change-amount').textContent = change.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        alert('Uang yang diterima tidak cukup atau tidak valid.');
    }
}

function completeTransaction() {
    const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = ''; // Remove all rows

    totalPrice = 0;
    document.getElementById('total-price').textContent = totalPrice.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('change-amount').textContent = '0';
    document.getElementById('amount-received').value = '';
    alert('Transaksi selesai. Keranjang belanja telah dikosongkan.');
}
