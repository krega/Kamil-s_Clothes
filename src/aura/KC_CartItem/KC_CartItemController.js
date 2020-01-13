({
    doInit : function (component,event,helper) {
              console.log('asdsadasd' +component.get("v.record.Product2.Size__c"));
           },
    addItem : function (component,event,helper) {
        helper.addItemToCart(component);
    },
    removeItem : function (component,event,helper) {
       helper.removeItemFromCart(component);
    }
});