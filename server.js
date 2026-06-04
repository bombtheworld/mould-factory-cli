const {
    loadOrders,
    addOrder,
    findOrder,
    completeOrder,
    deleteOrder,
    calculateProfit
} = require('./db');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/orders', (req, res) => {
    const orders = loadOrders();
    res.json(orders);
});

app.post('/orders', (req, res) => {
    const { customerName, productDesc, price, dueDate } = req.body;
    const newOrder = addOrder(customerName, productDesc, price, dueDate);
    res.status(201).json(newOrder);
});

app.put('/orders/:id/complete', (req, res) => {
    const orderId = Number(req.params.id);
    const completedOrder = completeOrder(orderId);

    if (completedOrder === null) {
        res.status(404).json({ message: 'Order not found' });
        return;
    }

    res.json(completedOrder);
});

app.delete('/orders/:id', (req, res) => {
    const orderId = Number(req.params.id);
    const deletedOrder = deleteOrder(orderId);

    if (deletedOrder === null) {
        res.status(404).json({ message: 'Order not found' });
        return;
    }

    res.json(deletedOrder);
});

app.get('/orders/:id', (req, res) => {
    const id = Number(req.params.id);
    const orders = loadOrders();
    const order = orders.find(order => order.id === id);

    if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
    }

    res.json(order);
});

app.get('/orders/search/:customerName', (req, res) => {
    const customerName = req.params.customerName;
    const result = findOrder(customerName);

    res.json(result);
});

app.post('/orders/:id/profit', (req, res) => {
    const orderId = Number(req.params.id);
    const cost = Number(req.body.cost);
    const result = calculateProfit(orderId, cost);

    if (result === null) {
        res.status(404).json({ message: 'Order not found' });
        return;
    }

    res.json(result);
});

app.listen(3000, () => {
    console.log('服务器跑起来了,端口3000');
});