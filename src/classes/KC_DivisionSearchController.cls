

public with sharing class KC_DivisionSearchController {

    private static String getQuery(String name, String city, String country) {
        String query = 'SELECT Id, Name, ShippingCountry, ShippingCity, ShippingStreet, ShippingPostalCode FROM Account WHERE Name LIKE \'%' + name + '%\'';
        query += String.isBlank(country) ? '' : ' AND ShippingCountry LIKE \'%' + country + '%\'';
        query += String.isBlank(city) ? '' : ' AND ShippingCity LIKE \'%' + city + '%\'';
        return query;
    }

    @AuraEnabled
    public static List<Account> getSearchResults(String name, String city, String country) {
        return Database.query(getQuery(name, city, country));
    }

    @AuraEnabled
    public static Account save(Account con) {
        upsert con;
        return con;
    }

    @AuraEnabled
    public static Boolean deleteDivision(String id){
        Database.DeleteResult result = Database.delete(id);
        return result.isSuccess();
    }
}
