public with sharing class KC_OrdersController {
    @AuraEnabled
    public static List<OrderWrapper> getUserOrders() {
        User currentUser = KC_Utils.getCurrentUser();
        List<Order> allOrders = [
                SELECT Id, Name, OrderNumber, TotalAmount, Status, BillingAddress
                FROM Order
                WHERE OwnerId = :currentUser.Id
                ORDER BY CreatedDate DESC
        ];
        List<OrderItem> allOrderItems = [SELECT Id, Product2.Name, UnitPrice, OrderId FROM OrderItem];
        List<OrderWrapper> ordersWithProducts = new List<KC_OrdersController.OrderWrapper>();
        for (Order order : allOrders) {
            List<OrderItem> relatedItems = new List<OrderItem>();
            for (OrderItem orderItem : allOrderItems) {
                if (order.Id == orderItem.OrderId) {
                    relatedItems.add(orderItem);
                }
            }
            ordersWithProducts.add(new OrderWrapper(order, relatedItems));
        }
        return ordersWithProducts;
    }
    public class OrderWrapper {
        @AuraEnabled
        public Order order;
        @AuraEnabled
        public List<OrderItem> orderItems;

        public OrderWrapper(Order order, List<OrderItem> orderItems) {
            this.order = order;
            this.orderItems = orderItems;
        }
    }
}