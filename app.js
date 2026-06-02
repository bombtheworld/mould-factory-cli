// 模具厂订单记录本

const orders = [];

function addOrder(customerName, productDesc, price) {
    const order = {
        id: orders.length + 1,
        customerName: customerName,
        productDesc: productDesc,
        price: price,
        status: 'pending',
    };
    orders.push(order);
    console.log(`订单已添加!`);
}

function showAllOrders() {
    if (orders.length === 0) {
        console.log('没有订单记录。');
        return;
    }
    console.log('--- 当前所有订单 ---');
    orders.forEach(function(order) {
        console.log(
            order.id + '. ' +
            order.customerName + ' | ' +
            order.productDesc + ' | ' + '$' +
            order.price + ' | ' +
            order.status
        );
    });
}

function findOrder(customerName) {
    const result = orders.filter(function(order) {
        return order.customerName === customerName;
    });
    if (result.length === 0) {
        console.log('找不到客户: ' + customerName);
        return;
    }
    console.log('--- 找到以下订单 ---');
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
        console.log('找不到订单ID: ' + orderId);
        return;
    }
    order.status = 'completed';
    console.log('订单: ' + orderId + ' 已完成! 客户: ' + order.customerName);
}

function deleteOrder(orderId) {
    const index = orders.findIndex(function(o) {
        return o.id === orderId;
    });
    if (index === -1) {
        console.log('找不到订单ID: ' + orderId);
        return;
    }
    const removedOrder = orders.splice(index, 1)[0];
    console.log('订单: ' + orderId + ' 已删除! 客户: ' + removedOrder.customerName);
}

// 测试代码 

addOrder('张三', '模具A', 5000);
addOrder('李四', '模具B', 7000);
addOrder('王五', '模具C', 6000);

findOrder('李四');
findOrder('赵六');

completeOrder(2);

deleteOrder(1);
showAllOrders();