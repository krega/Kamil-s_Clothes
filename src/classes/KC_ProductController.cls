public with sharing class KC_ProductController {
    @AuraEnabled
    public static List<PriceBookEntry> getNormalPrice(String query) {
        List<PricebookEntry> productList = [
                SELECT Id,Name,Product2Id,UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :query AND IsActive = true AND Pricebook2.IsStandard = true
                ORDER BY UnitPrice DESC

        ];
        System.debug(productList);
        return productList;
    }

    @AuraEnabled
    public static Decimal getProductPrices(String productId) {
        Set<Id> activePricebooks = KC_CommunitySearchController.getActiveDiscounts();
        List<PricebookEntry> prices = [
                SELECT Id,Name,Product2Id,UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :productId AND IsActive = true AND Pricebook2Id IN :activePricebooks
                ORDER BY UnitPrice DESC
        ];
        Map<Id, Decimal> minimalPrices = KC_CommunitySearchController.getMinimalPriceOfProducts(prices);
        if (!prices.isEmpty()) {
            return minimalPrices.get(productId);
        } else {
            return null;
        }
    }

    @AuraEnabled
    public static PricebookEntry getProductInfo(String id) {
        List<PricebookEntry> entries = [SELECT PriceBook2.Name, Product2.Id, Product2.Description, Product2.PhotoId__c, Product2.Name FROM PricebookEntry WHERE Product2Id = :id];
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
        return cart;
    }

    @AuraEnabled
    public static void setCartElements(String cartElements) {
        Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.Cart');
        sessionPartition.put('CartItems', cartElements);
    }

    @AuraEnabled
    public static void addToFavouritesList(String id, Double price){
        KC_Favourite_Product__c favouriteProduct = new KC_Favourite_Product__c(Product__c = id, Price__c = price,User__c = UserInfo.getUserId());
        Database.SaveResult saveResult = Database.insert(favouriteProduct);

    }
    @AuraEnabled
    public static List<KC_Favourite_Product__c> checkFavouriteProduct(String id) {

        List<KC_Favourite_Product__c> favourites = [SELECT Id, Product__c  FROM KC_Favourite_Product__c WHERE Product__c = :id AND User__c = :UserInfo.getUserId()];
        System.debug(favourites);
        return favourites;
    }


}