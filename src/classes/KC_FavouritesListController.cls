public with sharing class KC_FavouritesListController {
    @AuraEnabled
    public static List<KC_Favourite_Product__c> getFavouriteProduct() {

        List<KC_Favourite_Product__c> favourites = [SELECT Id, Product__c FROM KC_Favourite_Product__c WHERE User__c = :UserInfo.getUserId()];
        System.debug(favourites);
        return favourites;
    }

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

    @AuraEnabled
    public static void removeFromFavourites(String id) {
       KC_Favourite_Product__c favourite = [SELECT Id, Product__c FROM KC_Favourite_Product__c  WHERE Product__c=:id AND User__c = :UserInfo.getUserId()];
        System.debug(favourite);
        Database.DeleteResult result = Database.delete(favourite.Id);
    }
    @AuraEnabled
    public static List<PricebookEntry> getProductsWithPrices(String[] productIds) {
        Set<Id> activePricebooks = KC_CommunitySearchController.getActiveDiscounts();
        List<PricebookEntry> products = [
                SELECT Name,Product2Id,UnitPrice,Product2.Name,Product2.PhotoId__c, Product2.Family, Product2.Size__c
                FROM PricebookEntry
                WHERE Product2Id IN :productIds AND IsActive = true AND Pricebook2Id IN :activePricebooks
                ORDER BY UnitPrice DESC
        ];
        Map<Id, Decimal> minimalPrices = KC_CommunitySearchController.getMinimalPriceOfProducts(products);
        Map<Id, PricebookEntry> uniqueProducts = new Map<Id, PricebookEntry>();
        for (PricebookEntry result : products) {
            if (!uniqueProducts.containsKey(result.Product2Id)) {
                uniqueProducts.put(result.Product2Id, result);
            }
        }
        for (PricebookEntry uniqueProduct : uniqueProducts.values()) {
            uniqueProduct.UnitPrice = minimalPrices.get(uniqueProduct.Product2Id);
        }
        return uniqueProducts.values();
    }

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
}
