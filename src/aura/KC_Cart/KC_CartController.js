/**
 * Created by BRITENET on 09.01.2020.
 */
({
     calculateItems : function (component, event, helper) {
            helper.calculateItemsInCart(component);
        },
         redirectToCartPage : function (component,event,helper) {
                let urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": '/s/cart',
                    "isredirect":false
                });
                urlEvent.fire();
            }
})