public with sharing class KC_DiscountManagerController {

    @AuraEnabled
    public static List<PriceBookEntry> getNormalPrice(String query) {
        List<PricebookEntry> productList = [
                SELECT Id,Name,Product2Id,UnitPrice
                FROM PricebookEntry
                WHERE Product2Id = :query AND IsActive = true AND Pricebook2.IsStandard = true
                ORDER BY UnitPrice DESC
        ];
        return productList;
    }

    @AuraEnabled
    public static Pricebook2 getDiscountByID(String id) {
        Pricebook2 allPricebooks = [
                SELECT Id, Name, IsActive, BeginDate__c, DiscountType__c, DiscountValue__c, EndDate__c
                FROM Pricebook2
                WHERE IsStandard = FALSE AND Id = :id
        ];
        return allPricebooks;
    }

    @AuraEnabled
    public static List<PriceBookEntry> getRelatedItems(String id) {
        List<PriceBookEntry> priceBookEntries = [
                SELECT Product2.Id, Product2.Name, Product2.Family, Product2.Producent__c,UnitPrice
                FROM PriceBookEntry
                WHERE Pricebook2Id IN (
                        SELECT Id
                        FROM PriceBook2
                        WHERE IsStandard = FALSE AND Id = :id
                )
        ];
        return priceBookEntries;
    }

    @AuraEnabled
    public static List<Pricebook2> getAllDiscounts() {
        List<Pricebook2> allPricebooks = [
                SELECT Id, Name, IsActive, BeginDate__c, DiscountType__c, DiscountValue__c, EndDate__c
                FROM Pricebook2
                WHERE IsStandard = FALSE
        ];
        return allPricebooks;
    }

    @AuraEnabled
    public static List<KC_DiscountItem> getDiscountItems() {
        List<Pricebook2> allDiscounts = getAllDiscounts();
        List<KC_DiscountItem> discountItems = new List<KC_DiscountManagerController.KC_DiscountItem>();
        Set<Id> discountIds = new Set<Id>();
        for (Pricebook2 discount : allDiscounts) {
            discountIds.add(discount.Id);
        }
        List<PricebookEntry> allPricebookEntries = [
                SELECT Id, Name,UnitPrice, Product2.Family, Pricebook2Id
                FROM PricebookEntry
                WHERE Pricebook2Id IN :discountIds
        ];
        for (Pricebook2 pricebook : allDiscounts) {
            List<PricebookEntry> pricebookPriceEntries = new List<PricebookEntry>();
            for (PricebookEntry ent : allPricebookEntries) {
                if (ent.Pricebook2Id == pricebook.Id) {
                    pricebookPriceEntries.add(ent);
                }
            }
            KC_DiscountItem priceBookItem = new KC_DiscountItem(pricebook, pricebookPriceEntries);
            discountItems.add(priceBookItem);
        }
        return discountItems;
    }

    @AuraEnabled
    public static List<Product2> getAllProducts() {
        return [
                SELECT Id, Name, Family, Producent__c
                FROM Product2
        ];
    }

    public static Map<Id, Decimal> getCurrentPrices() {
        List<PricebookEntry> allPrices = [
                SELECT Product2Id,UnitPrice
                FROM PricebookEntry
                WHERE Pricebook2.IsStandard = TRUE
        ];
        Map<Id, Decimal> productAndPrices = new Map<Id, Decimal>();
        for (PricebookEntry item : allPrices) {
            productAndPrices.put(item.Product2Id, item.UnitPrice);
        }
        return productAndPrices;
    }

    @AuraEnabled
    public static void createNewDiscount(List<Id> discountedProductIds, String name, String discountType, Decimal discountValue, String startDate, String endDate) {
        Pricebook2 discount = new Pricebook2();
        discount.Name = name;
        discount.DiscountType__c = discountType;
        discount.DiscountValue__c = discountValue;
        discount.BeginDate__c = Date.valueOf(startDate);
        discount.EndDate__c = Date.valueOf(endDate);
        discount.IsActive = true;
        try {
            upsert discount;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating discount Pricebook');
        }

        List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
        Map<Id, Decimal> currentPrices = getCurrentPrices();
        for (Id product : discountedProductIds) {
            PricebookEntry discountedProduct = new PricebookEntry();
            discountedProduct.Pricebook2Id = discount.Id;
            discountedProduct.Product2Id = product;
            discountedProduct.UnitPrice = getDiscountedProductPrice(currentPrices.get(product), discountType, discountValue);
            discountedProduct.IsActive = true;
            pricebookEntries.add(discountedProduct);
        }
        try {

            upsert pricebookEntries;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating PriceEntry');
        }

    }
    @AuraEnabled
    public static Decimal getDiscountedProductPrice(Decimal currentPrice, String discountType, Decimal discountValue) {
        if (discountType == 'Percent') {
            return currentPrice - (currentPrice * discountValue);
        } else {
            return currentPrice - discountValue;
        }
    }

    @AuraEnabled
    public static Boolean deleteSelectedDiscount(String recordToDelete) {
        Pricebook2 discountToDelete = [SELECT Id FROM Pricebook2 WHERE Id = :recordToDelete];
        Database.DeleteResult deleteResult = Database.delete(discountToDelete);
        return deleteResult.isSuccess();
    }

    @AuraEnabled
    public static void createList(String id, List<Id> discountedProductIds, String discountType, Decimal discountValue) {
        List<PricebookEntry> newPrieBook = new List<PricebookEntry>();
        deletePriceBook(id);
        Map<Id, Decimal> currentPrices = getCurrentPrices();
        for (Id product : discountedProductIds) {
            PricebookEntry discountedProduct = new PricebookEntry();
            discountedProduct.Pricebook2Id = id;
            discountedProduct.Product2Id = product;
            discountedProduct.UnitPrice = getDiscountedProductPrice(currentPrices.get(product), discountType, discountValue);
            discountedProduct.IsActive = true;
            newPrieBook.add(discountedProduct);
        }
        try {
            System.debug(newPrieBook);
            insert newPrieBook;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating PriceEntry');
        }
    }

    @AuraEnabled
    public static void updateDiscountFromModal(String id, List<Id> discountedProductIds, String name, String discountType, Decimal discountValue, String startDate, String endDate) {
        Pricebook2 discount = KC_DiscountManagerController.getDiscountByID(id);
        discount.Name = name;
        discount.DiscountType__c = discountType;
        discount.DiscountValue__c = discountValue;
        discount.BeginDate__c = Date.valueOf(startDate);
        discount.EndDate__c = Date.valueOf(endDate);
        discount.IsActive = true;
        try {
            upsert discount;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating discount Pricebook');
        }
        List<PricebookEntry> newPriceBook = new List<PricebookEntry>();
        List<PricebookEntry> pricebookEntries = getPriceBook(id);
        deletePriceBook(id);
        for (PricebookEntry product : pricebookEntries) {
            PricebookEntry discountedProduct = new PricebookEntry();
            discountedProduct.Pricebook2Id = discount.Id;
            discountedProduct.Product2Id = product.Product2Id;
            discountedProduct.UnitPrice = product.UnitPrice;
            discountedProduct.IsActive = true;
            newPriceBook.add(discountedProduct);
        }
        Map<Id, Decimal> currentPrices = getCurrentPrices();
        for (Id product : discountedProductIds) {
            PricebookEntry discountedProduct = new PricebookEntry();
            discountedProduct.Pricebook2Id = discount.Id;
            discountedProduct.Product2Id = product;
            discountedProduct.UnitPrice = getDiscountedProductPrice(currentPrices.get(product), discountType, discountValue);
            discountedProduct.IsActive = true;
            newPriceBook.add(discountedProduct);
        }
        try {
            insert newPriceBook;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating PriceEntry');
        }

    }

    public static List<PricebookEntry> getPriceBook(String id) {
        List<PricebookEntry> pricebookEntries = [SELECT UnitPrice,Pricebook2Id,Product2Id FROM PricebookEntry WHERE Pricebook2Id = :id];
        return pricebookEntries;

    }
    public static void deletePriceBook(String id) {
        List<PricebookEntry> pricebookEntries = [SELECT UnitPrice,Pricebook2Id,Product2Id FROM PricebookEntry WHERE Pricebook2Id = :id];
        for (PricebookEntry newDiscount : pricebookEntries) {
            Database.delete(newDiscount.Id);
        }

    }

    public class KC_DiscountItem {
        @AuraEnabled
        public Pricebook2 pricebook { get; set; }
        @AuraEnabled
        public List<PricebookEntry> priceEntries { get; set; }

        public KC_DiscountItem(Pricebook2 pricebook, List<PricebookEntry> priceEntries) {
            this.pricebook = pricebook;
            this.priceEntries = priceEntries;
        }
    }
}