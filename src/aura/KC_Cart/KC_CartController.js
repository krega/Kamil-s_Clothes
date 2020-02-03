({
    calculateItems: function(component, event, helper) {
        helper.calculateItemsInCart(component);
        helper.getProductsFromCart(component);
    },

    redirectToCartPage: function() {
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/s/cart',
            "isredirect": false
        });
        urlEvent.fire();
    },

    openPop: function(component, event, helper) {
        var cmpTarget = component.find('pop');
        $A.util.addClass(cmpTarget, 'slds-show');
        $A.util.removeClass(cmpTarget, 'slds-hide');
        helper.calculateItemsInCart(component);
        helper.getProductsFromCart(component);
    },

    closePop: function(component) {
        var cmpTarget = component.find('pop');
        $A.util.addClass(cmpTarget, 'slds-hide');
        $A.util.removeClass(cmpTarget, 'slds-show');
    }
})