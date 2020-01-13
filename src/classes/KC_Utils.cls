/**
 * Created by BRITENET on 09.01.2020.
 */

public with sharing class KC_Utils {
    public static String checkIfNull(String param) {
        if (param == null) {
            return '';
        }
        return param;
    }

}