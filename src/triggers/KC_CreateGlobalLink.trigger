/**
 * Created by BRITENET on 07.01.2020.
 */

trigger KC_CreateGlobalLink on ContentDocumentLink (before insert, before update) {
    Set<Id> photoIds = new Set<Id>();
    for (ContentDocumentLink result : Trigger.new){
        photoIds.add(result.ContentDocumentId);
    }
    System.debug(photoIds);
    List<ContentDocumentLink> photos = [SELECT ContentDocumentId,ContentDocument.LatestPublishedVersionId,LinkedEntityId,ContentDocument.Title,ContentDocument.FileType FROM ContentDocumentLink WHERE ContentDocumentId IN :photoIds];
    System.debug(photos);
    Map<Id,Id> photoDocumentMap = new Map<Id, Id>();
    for (ContentDocumentLink photo : photos){
        photoDocumentMap.put(photo.ContentDocumentId,photo.ContentDocument.LatestPublishedVersionId);
    }
    System.debug(photoDocumentMap);
    List<ContentDistribution> imagesToAdd = new List<ContentDistribution>();
    for (ContentDocumentLink result : Trigger.new){
//            System.debug(result.LinkedEntityId);
        ContentDistribution externalContent = new ContentDistribution();
        externalContent.Name = result.LinkedEntityId;
        externalContent.ContentVersionId = photoDocumentMap.get(result.ContentDocumentId);
        externalContent.PreferencesAllowViewInBrowser = true;
        externalContent.PreferencesLinkLatestVersion = true;
        externalContent.PreferencesNotifyOnVisit = false;
        externalContent.PreferencesAllowOriginalDownload = true;
        result.Visibility = 'AllUsers';
        imagesToAdd.add(externalContent);
    }
//        System.debug(JSON.serialize(imagesToAdd));
    System.debug(imagesToAdd);
    upsert imagesToAdd;
}