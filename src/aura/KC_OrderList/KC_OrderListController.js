({
    doInit : function (component, event, helper) {
        helper.getAllOrders(component);
    },
    showDetails : function (component, event, helper) {
        let index = event.currentTarget.dataset.index;
        let allOrders = component.get("v.allOrders");
        component.set("v.selectedOrder",allOrders[index]);
    },
     redirectToHome : function (component,event,helper) {
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/s/',
             "isredirect":false
          });
          urlEvent.fire();
         },
});