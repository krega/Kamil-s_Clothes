public with sharing class KC_CartController {
    @AuraEnabled
    public static String getCartElements() {
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.Cart');
        String cart = (String) sessionPartition.get('CartItems');
        return cart;
    }
    @AuraEnabled
    public static String setCartElements(String cartElements) {
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.Cart');
        sessionPartition.put('CartItems', cartElements);
        return (String) sessionPartition.get('CartItems');
    }
    private static void deleteAllCustomerCartItems() {
        if (Cache.Session.contains('local.Cart.CartItems')) {
            Cache.Session.remove('local.Cart.CartItems');
        }
    }
    @AuraEnabled
    public static List<PricebookEntry> getProductsWithPrices(String[] productIds) {
        List<PricebookEntry> prices = [
                SELECT Name,Product2Id,UnitPrice,Product2.Name,Product2.PhotoId__c, Product2.Family,Product2.Size__c
                FROM PricebookEntry
                WHERE Product2Id IN :productIds AND IsActive = true
                ORDER BY UnitPrice DESC
        ];
        return prices;
    }
    public static User getUserInfo(){

        return KC_Utils.getCurrentUser();
    }

    @AuraEnabled
    public static User getBillingInfo(){
        return KC_Utils.getUserBillingAddress();
    }

    @AuraEnabled
    public static void postAnOrder(String newOrderPram){
        NewOrderWrapper newOrder = (NewOrderWrapper)JSON.deserialize(newOrderPram,NewOrderWrapper.class);
        Order__c orderFromModal = Order__c.getInstance();
        Pricebook2 standardPriceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        Order orderToAdd = new Order();
        orderToAdd.AccountId = orderFromModal.AccountId__c;
        orderToAdd.ContractId = orderFromModal.ContractId__c;
        orderToAdd.BillingStreet = newOrder.BillingStreet;
        orderToAdd.BillingPostalCode = newOrder.BillingPostalCode;
        orderToAdd.BillingState = newOrder.BillingState;
        orderToAdd.BillingCountry = newOrder.BillingCountry;
        orderToAdd.BillingCity = newOrder.BillingCity;
        orderToAdd.Status = 'Draft';
        orderToAdd.EndDate = Date.today().addDays(30);
        orderToAdd.EffectiveDate = Date.today();
        orderToAdd.Pricebook2Id = standardPriceBook.Id;
        try {
            insert orderToAdd;
        } catch (System.DmlException e) {
            throw new AuraHandledException('Error creating order');
        }
        List<OrderItem> items = new List<OrderItem>();

        if (!newOrder.Items.isEmpty()) {
            for (Items item : newOrder.Items){
                OrderItem tmpItem = new OrderItem();
                tmpItem.UnitPrice = item.UnitPrice;
                tmpItem.Quantity = item.Count;
                tmpItem.PricebookEntryId = item.Id;
                tmpItem.Product2Id = item.Product2Id;
                tmpItem.OrderId = orderToAdd.Id;
                items.add(tmpItem);
            }
        }
        try {
            insert items;
        } catch (System.DmlException e) {
            throw new AuraHandledException('Error creating order');
        }
        deleteAllCustomerCartItems();
    }
    public class NewOrderWrapper{
        @AuraEnabled
        public List<Items> Items;
        @AuraEnabled
        public String BillingStreet;
        @AuraEnabled
        public String BillingPostalCode;
        @AuraEnabled
        public String BillingState;
        @AuraEnabled
        public String BillingCountry;
        @AuraEnabled
        public String BillingCity;
        @AuraEnabled
        public Decimal TotalPrice;
    }
    public class Items {
        @AuraEnabled
        public String Name;
        @AuraEnabled
        public String Product2Id;
        @AuraEnabled
        public Integer UnitPrice;
        @AuraEnabled
        public String Id;
        @AuraEnabled
        public Product2 Product2;
        @AuraEnabled
        public Integer Count;
    }

}