public with sharing class KC_ProductController {
    @AuraEnabled
    public static Decimal getProductPrices(String productId) {
        List<PricebookEntry> prices = [
                SELECT UnitPrice, Product2.PhotoId__c
                FROM PricebookEntry
                WHERE Product2Id = :productId AND IsActive = true
                ORDER BY UnitPrice DESC
        ];
        return prices[0].UnitPrice;
    }

    @AuraEnabled
    public static PricebookEntry getProductInfo(String id){
        List<PricebookEntry> entries = [SELECT PriceBook2.Name, Product2.Id, Product2.Description, Product2.PhotoId__c, Product2.Name FROM PricebookEntry WHERE Product2Id = :id];
        System.debug(entries);
        return entries[0];

    }

    @AuraEnabled
    public static List<KC_Product_Photo__c> productPhotos(String id) {
        List<KC_Product_Photo__c> photos = [SELECT Id, Product__c, ImgUrl__c FROM KC_Product_Photo__c WHERE Product__c = :id];
        return photos;
    }

    @AuraEnabled
    public static String getCartElements() {
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.Cart');
        String cart = (String) sessionPartition.get('CartItems');
        System.debug(cart);
        return cart;
    }

    @AuraEnabled
    public static void setCartElements(String cartElements) {
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.Cart');
        sessionPartition.put('CartItems', cartElements);
    }
}