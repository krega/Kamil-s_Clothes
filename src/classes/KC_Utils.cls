public with sharing class KC_Utils {
    public static String checkIfNull(String param) {
        if (param == null) {
            return '';
        }
        return param;
    }

    public static User getCurrentUser() {
        return getUser(UserInfo.getUserId());
    }

    public static User getUser(String userId) {
        List<User> users = [SELECT Id,Username,Country FROM User WHERE Id = :userId];
        if (users.isEmpty()) {
            return null;
        }
        return users[0];
    }

    public static User getUserBillingAddress() {
        Id userId =UserInfo.getUserId();
        List<User> users = [SELECT Id,Username,Country,Street,Address FROM User WHERE Id = :userId];
        if (users.isEmpty()) {
            return null;
        }
        return users[0];
    }
}
