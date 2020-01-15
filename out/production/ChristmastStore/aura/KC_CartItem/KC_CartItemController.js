({
    doInit : function (component,event,helper) {
              console.log(component.get("v.record"));
           },
    addItem : function (component,event,helper) {
        helper.addItemToCart(component);
    },
    removeItem : function (component,event,helper) {
       helper.removeItemFromCart(component);
    }
});