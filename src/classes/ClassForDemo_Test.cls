/**
 * Created by BRITENET on 30.01.2020.
 */

@IsTest
private class ClassForDemo_Test {


    @IsTest
    private static void  shouldIncrementNumber() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }
/*


    @IsTest
    private static void  shouldDecrementNumber() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn100000() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    @IsTest
    private static void  shouldIncrementNumber1() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber1() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000001() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }  @IsTest
    private static void  shouldIncrementNumber2() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber2() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000002() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    private static void  shouldIncrementNumber3() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber3() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000003() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    private static void  shouldIncrementNumber4() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber4() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000004() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    private static void  shouldIncrementNumber5() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber5() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000005() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    @IsTest
    private static void  shouldIncrementNumber6() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber6() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000006() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }  @IsTest
    private static void  shouldIncrementNumber7() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber7() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000007() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    private static void  shouldIncrementNumber8() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber8() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000008() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
    private static void  shouldIncrementNumber9() {
        Integer a = 10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(11, value);
    }

    @IsTest
    private static void  shouldDecrementNumber9() {
        Integer a = -10;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(-11, value);
    }

    @IsTest
    private static void  shouldReturn1000009() {
        Integer a = 0;

        ClassForDemo controller = new ClassForDemo();
        Test.startTest();
        Integer value = controller.AddNumber(a);
        Test.stopTest();
        System.assertEquals(100000, value);
    }
*/

}