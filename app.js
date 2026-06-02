// Mold factory order log

const orders = [];

function addOrder(customerName, productDesc, price, dueDate) {
    const order = {
        id: orders.length + 1,
        customerName: customerName,
        productDesc: productDesc,
        price: price,
        due_date: dueDate,
        status: 'pending',
    };
    orders.push(order);
    console.log(`Order added!`);
}

function showAllOrders() {
    if (orders.length === 0) {
        console.log('No order records.');
        return;
    }
    console.log('--- All Current Orders ---');
    orders.forEach(function(order) {
        console.log(
            order.id + '. ' +
            order.customerName + ' | ' +
            order.productDesc + ' | ' + '$' +
            order.price + ' | ' +
            order.status + ' | Due: ' +
            order.due_date
        );

        const today = new Date();
        const dueDate = new Date(order.due_date);
        const daysLeft = (dueDate - today) / (1000 * 60 * 60 * 24);

        if (order.status === 'pending' && daysLeft < 0) {
            console.log('❌ 订单已逾期');
        } else if (order.status === 'pending' && daysLeft >= 0 && daysLeft <= 3) {
            console.log('⚠️ 订单即将逾期');
        }
    });
}

function findOrder(customerName) {
    const result = orders.filter(function(order) {
        return order.customerName === customerName;
    });
    if (result.length === 0) {
        console.log('Customer not found: ' + customerName);
        return;
    }
    console.log('--- Matching Orders ---');
    result.forEach(function(order) {
        console.log(
            order.id + '. ' +
            order.customerName + ' | ' +
            order.productDesc + ' | ' +
            order.status
        );
    });
}

function completeOrder(orderId) {
    const order = orders.find(function(o) {
        return o.id === orderId;
    });
    if (order === undefined) {
        console.log('Order ID not found: ' + orderId);
        return;
    }
    order.status = 'completed';
    console.log('Order: ' + orderId + ' completed! Customer: ' + order.customerName);
}

function deleteOrder(orderId) {
    const index = orders.findIndex(function(o) {
        return o.id === orderId;
    });
    if (index === -1) {
        console.log('Order ID not found: ' + orderId);
        return;
    }
    const removedOrder = orders.splice(index, 1)[0];
    console.log('Order: ' + orderId + ' deleted! Customer: ' + removedOrder.customerName);
}

function calculateProfit(orderId, cost) {
    const order = orders.find(function(o) {
        return o.id === orderId;
    });

    if (order === undefined) {
        console.log('Order ID not found: ' + orderId);
        return;
    }

    const profit = order.price - cost;
    const profitRate = profit / order.price * 100;

    console.log('Order ID: ' + order.id);
    console.log('Customer: ' + order.customerName);
    console.log('Quote price: $' + order.price);
    console.log('Cost: $' + cost);
    console.log('Profit: $' + profit);
    console.log('Profit rate: ' + profitRate.toFixed(2) + '%');

    if (profitRate < 20) {
        console.log('⚠️ Warning: Profit rate is too low');
    }
}

// Test code

addOrder('Zhang San', 'Mold A', 5000, '2026-06-04');
addOrder('Li Si', 'Mold B', 7000, '2026-06-10');
addOrder('Wang Wu', 'Mold C', 6000, '2026-06-03');
addOrder('Zhao Liu', 'Mold D', 8000, '2026-06-1');

findOrder('Li Si');
findOrder('Zhao Liu');

completeOrder(2);

deleteOrder(1);

calculateProfit(2, 6000);

showAllOrders();