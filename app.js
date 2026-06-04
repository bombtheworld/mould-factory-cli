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
    console.log('=== 模具厂订单管理系统 ===');
    console.log('1. 查看所有订单');
    console.log('2. 添加订单');
    console.log('3. 完成订单');
    console.log('4. 删除订单');
    console.log('5. 查找订单');
    console.log('6. 计算利润');
    console.log('7. 退出');
    console.log();

rl.question('请选择：', (answer) => {

    if (answer === '1') {
        showAllOrders();
        showMenu();

    } else if (answer === '2') {

        rl.question('请输入客户名字：', (customerName) => {

            rl.question('请输入产品描述：', (productDesc) => {

                rl.question('请输入报价金额：', (price) => {

                    rl.question('请输入交货日期(YYYY-MM-DD):', (dueDate) => {

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

        rl.question('请输入订单ID：', (orderId) => {

            const completedOrder = completeOrder(Number(orderId));

            if (completedOrder === null) {
                console.log('Order ID not found: ' + orderId);
            } else {
                console.log('Order: ' + orderId + ' completed! Customer: ' + completedOrder.customerName);
            }

            showMenu();

        });

    } else if (answer === '4') {

        rl.question('请输入订单ID：', (orderId) => {

            const deletedOrder = deleteOrder(Number(orderId));

            if (deletedOrder === null) {
                console.log('Order ID not found: ' + orderId);
            } else {
                console.log('Order: ' + orderId + ' deleted!');
            }

            showMenu();

        });

    } else if (answer === '5') {

        rl.question('请输入客户名字：', (customerName) => {

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

        rl.question('请输入订单ID：', (orderId) => {

            rl.question('请输入成本：', (cost) => {

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
        console.log('程序已退出');
        rl.close();
    } else {
        console.log('无效输入');
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
            console.log('❌ 订单已逾期');
        } else if (order.status === 'pending' && daysLeft >= 0 && daysLeft <= 3) {
            console.log('⚠️ 订单即将逾期');
        }
    });
}

showMenu();