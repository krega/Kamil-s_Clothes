({
     doInit: function(component, event, helper) {
              helper.getOldPrice(component);
              console.log(component.get("v.record"));
        },
    addItem : function (component,event,helper) {
        helper.addItemToCart(component);

    },
    removeItem : function (component,event,helper) {
       helper.removeItemFromCart(component);
    },
   });