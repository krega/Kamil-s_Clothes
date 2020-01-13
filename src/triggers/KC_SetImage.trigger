/**
 * Created by BRITENET on 10.01.2020.
 */

trigger KC_SetImage on ContentDistribution (after insert, after update) {
    Set<Id> photoIds = new Set<Id>();
    for (ContentDistribution photo : Trigger.new){
        photoIds.add(photo.Name);
        System.debug(photo.ContentDownloadUrl);
    }
    List<Product2> existingProducts = [SELECT Id,PhotoId__c FROM Product2 WHERE Id IN :photoIds];
    System.debug(existingProducts);
}