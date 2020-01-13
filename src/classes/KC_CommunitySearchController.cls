public with sharing class KC_CommunitySearchController {
    @AuraEnabled
    public static List<PriceBookEntry> getProductsByName(String query) {
        List<PriceBookEntry> productList = [
                SELECT Name, Product2.Name,Product2.PhotoId__c, Product2.Photo__c, Product2.ProductCode, PriceBook2.Name,UnitPrice, Product2.Family, Id, Product2Id,Product2.Size__c
                FROM PriceBookEntry
                WHERE Name LIKE :KC_Utils.checkIfNull(query) + '%' AND IsActive = TRUE
                ORDER BY UnitPrice DESC
        ];
        return productList;
    }


}
