({
    doInit: function(component, event, helper) {
        helper.getProductsFromCart(component);
    },
    redirectToHome: function() {
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/s/',
            "isredirect": false
        });
        urlEvent.fire();
    },
    showOrderModal: function(component, event, helper) {
        component.set("v.orderModal", true);
         helper.fillOrderModal(component);
    },
    closeOrderModal: function(component) {
        component.set("v.orderModal", false);
    },
    makeAnOrder: function(component, event, helper) {
        let billingAddress = component.get("v.billingStreet");
        helper.postAnOrder(component);
        let makeAnOrderEvent = $A.get("e.c:KC_AddItemToCart");
        makeAnOrderEvent.fire();
    }
})