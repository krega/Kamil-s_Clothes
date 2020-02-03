/**
 * Created by BRITENET on 30.01.2020.
 */

public with sharing class ClassForDemo {
    public Integer AddNumber(Integer numberToAdd) {
        if (numberToAdd > 0) {
            numberToAdd++ ;
        }
        if (numberToAdd < 0) {
            numberToAdd--;
        }
        return numberToAdd;
    }
}