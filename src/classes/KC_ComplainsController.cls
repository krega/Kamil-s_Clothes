/**
 * Created by BRITENET on 15.01.2020.
 */

public with sharing class KC_ComplainsController {

    @AuraEnabled
    public static void createNewCase(String orderId, String caseSubject, String caseDescription) {
        KC_ComplainsController.createCaseFromWebOrder(orderId, caseSubject, caseDescription);
    }

    @AuraEnabled
    public static List<Case> getUserCases() {
        String userId = UserInfo.getUserId();
        List<Case> casesList = [SELECT Id, Subject, Description, CaseNumber, Order__r.OrderNumber, Status FROM Case WHERE CreatedById = :userId ORDER BY CaseNumber DESC];
        return casesList;
    }

    @AuraEnabled
    public static List<CaseComment> getComments(Id CaseId) {
        List<CaseComment> comments = [SELECT CommentBody FROM CaseComment WHERE ParentId = :CaseId AND IsPublished = true];
        return comments;
    }

    public static void createCaseFromWebOrder(String orderId, String subject, String description) {
        AssignmentRule AR = new AssignmentRule();
        AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];
        Database.DMLOptions dmlOpts = new Database.DMLOptions();
        dmlOpts.assignmentRuleHeader.assignmentRuleId = AR.id;
        Case newCase = new Case();
        newCase.Subject = subject;
        newCase.Description = description;
        newCase.Order__c = orderId;
        newCase.SuppliedEmail = UserInfo.getUserEmail();
        newCase.Origin = 'Email';
        newCase.setOptions(dmlOpts);
        insert newCase;
    }
}