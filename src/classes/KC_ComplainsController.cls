/**
 * Created by BRITENET on 15.01.2020.
 */

public with sharing class KC_ComplainsController {

    @AuraEnabled
    public static void createNewCase(String orderId, String caseSubject, String caseDescription){
        System.debug('orderId' + orderId);
        System.debug('caseSubject' + caseSubject);
        System.debug('caseDescription' + caseDescription);
        KC_ComplainsController.createCaseFromWebOrder(orderId, caseSubject, caseDescription);
    }

    @AuraEnabled
    public static List<Case> getUserCases(){
        return KC_ComplainsController.getUserCases1();
    }
    public static List<Case> getUserCases1(){
        String userId = UserInfo.getUserId();
        List<Case> casesList = [SELECT Id, Subject, Description, CaseNumber, Order__r.OrderNumber, Status FROM Case WHERE CreatedById = :userId ORDER BY CaseNumber DESC];
        return casesList;
    }

    public static void createCaseFromWebOrder(String orderId, String subject, String description){
       Case newCase = new Case();
        newCase.Subject = subject;
        newCase.Description = description;
        newCase.Order__c = orderId;
        newCase.RecordTypeId__c	 = '8013X0000084OJKQA2';
        newCase.SuppliedEmail = UserInfo.getUserEmail();
        newCase.Origin = 'cos';
        newCase.SuppliedName ='cos' + ' ' + orderId;

        insert newCase;
    }
}