/**
 * Created by BRITENET on 09.01.2020.
 */

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
    public static void deleteAllCustomerCartItems() {
        if (Cache.Session.contains('local.Cart.CartItems')) {
            Cache.Session.remove('local.Cart.CartItems');
        }
    }
/*    @AuraEnabled
    public static List<PricebookEntry> getProductsWithPrices(String[] productIds) {

        List<PricebookEntry> products = [
                SELECT Name,Product2Id,UnitPrice,Product2.Name,Product2.PhotoId__c
                FROM PricebookEntry
                WHERE Product2Id IN :productIds AND IsActive = true
                ORDER BY UnitPrice DESC
        ];
        Map<Id, Decimal> minimalPrices = RIF_CommunitySearchController.getMinimalPriceOfProducts(products);
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
    }*/
    @AuraEnabled
    public static List<PricebookEntry> getProductsWithPrices(String[] productIds) {
        /*string val1 = '01t3X00000GE0r4QAD';
        string val2 = '01t3X00000GE0LPQA1';
        String [] productIds = new List<String>();
        productIds.add(val1);
        productIds.add(val2);*/
        List<PricebookEntry> prices = [
                SELECT Name,Product2Id,UnitPrice,Product2.Name,Product2.PhotoId__c, Product2.Family,Product2.Size__c
                FROM PricebookEntry
                WHERE Product2Id IN :productIds AND IsActive = true
                ORDER BY UnitPrice DESC
        ];
        System.debug(prices);
        return prices;
    }
}