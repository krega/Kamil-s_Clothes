
public with sharing class KC_CommunitySearchController {
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

    public static Set<Id> getActiveDiscounts() {
        List<Pricebook2> activePricebooks = [
                SELECT Id
                FROM Pricebook2
                WHERE DiscountActive__c = TRUE
        ];
        Set<Id> activePricebookIds = new Set<Id>();
        for (Pricebook2 pricebook : activePricebooks) {
            activePricebookIds.add(pricebook.Id);
        }
        return activePricebookIds;
    }

    @AuraEnabled
    public static List<PriceBookEntry> getProductsByName(String query) {
        Set<Id> activePricebooks = getActiveDiscounts();
        List<PricebookEntry> results = [
                SELECT Name, Product2.Name,Product2.PhotoId__c, Product2.Photo__c, Product2.ProductCode, PriceBook2.Name,UnitPrice, Product2.Family, Id, Product2Id
                FROM PriceBookEntry
                WHERE Name LIKE :KC_Utils.checkIfNull(query) + '%' AND IsActive = TRUE AND Pricebook2Id IN :activePricebooks
                ORDER BY UnitPrice DESC
        ];
        Map<Id, Decimal> minimalPrices = getMinimalPriceOfProducts(results);
        Map<Id, PricebookEntry> uniqueProducts = new Map<Id, PricebookEntry>();
        for (PricebookEntry result : results) {
            if (!uniqueProducts.containsKey(result.Product2Id)) {
                uniqueProducts.put(result.Product2Id, result);
            }
        }
        for (PricebookEntry uniqueProduct : uniqueProducts.values()) {
            uniqueProduct.UnitPrice = minimalPrices.get(uniqueProduct.Product2Id);
        }
        System.debug(uniqueProducts);
        return uniqueProducts.values();
    }

    public static Map<Id, Decimal> getMinimalPriceOfProducts(List<PricebookEntry> products) {
        List<PricebookEntry> standardPrices = [SELECT Product2Id,UnitPrice FROM PricebookEntry WHERE Pricebook2.IsStandard = TRUE];
        Map<Id, Decimal> productsWithStandardPrices = new Map<Id, Decimal>();
        for (PricebookEntry standardPrice : standardPrices) {
            productsWithStandardPrices.put(standardPrice.Product2Id, standardPrice.UnitPrice);
        }
        Map<Id, Decimal> productsWithPrices = new Map<Id, Decimal>();
        Decimal profit = 0, max = 0;
        for (PricebookEntry product : products) {
            profit = productsWithStandardPrices.get(product.Product2Id) - product.UnitPrice;
            max = profit;
            if (max >= profit) {
                max = profit;
                productsWithPrices.put(product.Product2Id, product.UnitPrice);
            }
        }
        return productsWithPrices;
    }
}


