/**
 * Created by BRITENET on 28.01.2020.
 */

public with sharing class KC_AddProductController {
    @AuraEnabled
    public static Id createProduct(String productName, String producerName, String productCode, Double standardPrice, String availableSizes, String family, String description, List<String> fileIds) {
        String photoUrl =   System.Label.KC_AttachmentForPhoto + fileIds[0];
        Product2 product = new Product2(Name = productName, Producent__c = productName, ProductCode = productCode, Size__c = availableSizes, Description = description, PhotoId__c = photoUrl, Family = family, IsActive = true);
        Database.SaveResult result = Database.insert(product);
        createPriceBookForProduct(product, standardPrice);
        saveProductPhotos(fileIds, product);
        return product.Id;
    }

    @AuraEnabled
    public static List<String> getSizeOption() {
        List < String > allOpts = new list < String > ();
        Schema.sObjectType objType = Product2.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        list < Schema.PicklistEntry > values =
                fieldMap.get('Size__c').getDescribe().getPickListValues();
        for (Schema.PicklistEntry a : values) {
            allOpts.add(a.getValue());
        }
        allOpts.sort();
        return allOpts;
    }

    @AuraEnabled
    public static List<String> getFamilyOption() {
        List < String > allOpts = new list < String > ();
        Schema.sObjectType objType = Product2.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        list < Schema.PicklistEntry > values =
                fieldMap.get('Family').getDescribe().getPickListValues();
        for (Schema.PicklistEntry a : values) {
            allOpts.add(a.getValue());
        }
        allOpts.sort();
        return allOpts;
    }

    @AuraEnabled
    public static void setMainPhoto(String url, String productId) {
        List<Product2> products = [SELECT Id, PhotoId__c FROM Product2 WHERE Id = :productId];
        products[0].PhotoId__c = url;
        Database.SaveResult result = Database.update(products[0]);
    }

    @AuraEnabled
    public static List<KC_Product_Photo__c> productPhotos(String id) {
        List<KC_Product_Photo__c> photos = [SELECT Id, Product__c, ImgUrl__c FROM KC_Product_Photo__c WHERE Product__c = :id];
        return photos;
    }

    @AuraEnabled
    public static String getMainPhotoUrl(String id) {
        List<Product2> products = [SELECT PhotoId__c FROM Product2 WHERE Id = :id];
        String url = products[0].PhotoId__c;
        return url;
    }

    private static void createPriceBookForProduct(Product2 product, Double standardPrice) {
        Pricebook2 pricebooks = [SELECT Id, Name FROM Pricebook2 WHERE IsStandard = true];
        PricebookEntry pricebookEntry = createPricebookEntry(pricebooks, product, standardPrice);
        Database.SaveResult save = Database.insert(pricebookEntry);
    }
    private static PricebookEntry createPricebookEntry(Pricebook2 pricebook, Product2 product, Double standardPrice) {
        PricebookEntry pricebookEntry = new PricebookEntry(Product2Id = product.Id, Pricebook2Id = pricebook.Id, UnitPrice = standardPrice, IsActive = true);
        return pricebookEntry;
    }
    private static void saveProductPhotos(List<String> fileIds, Product2 product) {

        List<KC_Product_Photo__c> productPhotos = new List<KC_Product_Photo__c>();
        for (String fileId : fileIds) {
            String url =   System.Label.KC_AttachmentForPhoto + fileId;
            productPhotos.add(new KC_Product_Photo__c(Product__c = product.Id, ImgUrl__c = url));
        }
        List<Database.SaveResult> saveResults = Database.insert(productPhotos, true);
    }

}