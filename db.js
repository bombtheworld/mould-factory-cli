const fs = require('fs');

function loadOrders() {
    const data = fs.readFileSync('orders.json', 'utf8');
    return JSON.parse(data);
}

function saveOrders(orders) {
    fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
}

function addOrder(customerName, productDesc, price, dueDate) {
    const orders = loadOrders();
    const newOrder = {
        id: orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1,
        customerName,
        productDesc,
        price,
        dueDate,
        status: 'pending'
    };
    orders.push(newOrder);
    saveOrders(orders);
    return newOrder;
}

function deleteOrder(orderId) {
    const orders = loadOrders();
    const newOrders = orders.filter(order => order.id !== orderId);

    if (newOrders.length === orders.length) {
        return null;
    }

    saveOrders(newOrders);
    return true;
}

function completeOrder(orderId) {
    const orders = loadOrders();
    const order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = 'completed';
        saveOrders(orders);
        return order;
    } else {
        return null;
    }
}   

function findOrder(customerName) {
    const orders = loadOrders();
    return orders.filter(order => order.customerName === customerName);
} 

function calculateProfit(orderId, cost) {
    const orders = loadOrders();

    const order = orders.find(function(o) {
        return o.id === orderId;
    });

    if (order === undefined) {
        return null;
    }

    const profit = order.price - cost;
    const profitRate = profit / order.price * 100;

    return {
        orderId: order.id,
        customerName: order.customerName,
        quotePrice: order.price,
        cost: cost,
        profit: profit,
        profitRate: profitRate.toFixed(2) + '%',
        warning: profitRate < 20 ? 'Profit rate is too low' : null
    };
}

module.exports = { loadOrders, saveOrders , addOrder, deleteOrder, completeOrder, findOrder, calculateProfit };