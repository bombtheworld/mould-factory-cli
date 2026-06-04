const {
    loadOrders,
    addOrder,
    findOrder,
    completeOrder,
    deleteOrder,
    calculateProfit
} = require('./db');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function showMenu() {
    console.log('=== Mould Factory Order Management System ===');
    console.log('1. Show all orders');
    console.log('2. Add order');
    console.log('3. Complete order');
    console.log('4. Delete order');
    console.log('5. Find order');
    console.log('6. Calculate profit');
    console.log('7. Exit');
    console.log();

rl.question('Select an option: ', (answer) => {

    if (answer === '1') {
        showAllOrders();
        showMenu();

    } else if (answer === '2') {

        rl.question('Enter customer name: ', (customerName) => {

            rl.question('Enter product description: ', (productDesc) => {

                rl.question('Enter quote price: ', (price) => {

                    rl.question('Enter due date (YYYY-MM-DD): ', (dueDate) => {

                        const newOrder = addOrder(
                            customerName,
                            productDesc,
                            Number(price),
                            dueDate
                        );

                        console.log('Order added! ID: ' + newOrder.id);
                        showMenu();

                    });

                });

            });

        });

    } else if (answer === '3') {

        rl.question('Enter order ID: ', (orderId) => {

            const completedOrder = completeOrder(Number(orderId));

            if (completedOrder === null) {
                console.log('Order ID not found: ' + orderId);
            } else {
                console.log('Order: ' + orderId + ' completed! Customer: ' + completedOrder.customerName);
            }

            showMenu();

        });

    } else if (answer === '4') {

        rl.question('Enter order ID: ', (orderId) => {

            const deletedOrder = deleteOrder(Number(orderId));

            if (deletedOrder === null) {
                console.log('Order ID not found: ' + orderId);
            } else {
                console.log('Order: ' + orderId + ' deleted!');
            }

            showMenu();

        });

    } else if (answer === '5') {

        rl.question('Enter customer name: ', (customerName) => {

            const result = findOrder(customerName);

            if (result.length === 0) {
                console.log('Customer not found: ' + customerName);
            } else {
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

            showMenu();

        });

    } else if (answer === '6') {

        rl.question('Enter order ID: ', (orderId) => {

            rl.question('Enter cost: ', (cost) => {

                const result = calculateProfit(
                    Number(orderId),
                    Number(cost)
                );

                if (result === null) {
                    console.log('Order ID not found: ' + orderId);
                } else {
                    console.log('Order ID: ' + result.orderId);
                    console.log('Customer: ' + result.customerName);
                    console.log('Quote price: $' + result.quotePrice);
                    console.log('Cost: $' + result.cost);
                    console.log('Profit: $' + result.profit);
                    console.log('Profit rate: ' + result.profitRate);

                    if (result.warning !== null) {
                        console.log('⚠️ Warning: ' + result.warning);
                    }
                }

                showMenu();

            });

        });

    } else if (answer === '7') {
        console.log('Exiting...');
        rl.close();
    } else {
        console.log('Invalid input');
        rl.close();
    }

});
}

function showAllOrders() {
    const orders = loadOrders();

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
            order.dueDate
        );

        const today = new Date();
        const dueDate = new Date(order.dueDate);
        const daysLeft = (dueDate - today) / (1000 * 60 * 60 * 24);

        if (order.status === 'pending' && daysLeft < 0) {
            console.log('❌ Order overdue');
        } else if (order.status === 'pending' && daysLeft >= 0 && daysLeft <= 3) {
            console.log('⚠️ Order due soon');
        }
    });
}

showMenu();
