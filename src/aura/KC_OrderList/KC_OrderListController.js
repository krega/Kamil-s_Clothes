({
    doInit: function(component, event, helper) {
        helper.getAllOrders(component);
    },
    showDetails: function(component, event, helper) {
        let index = event.currentTarget.dataset.index;
        let allOrders = component.get("v.allOrders");
        component.set("v.selectedOrder", allOrders[index]);
        console.log(component.get("v.selectedOrder"));
    },
    redirectToHome: function(component, event, helper) {
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/s/',
            "isredirect": false
        });
        urlEvent.fire();
    },
    showSupportForm: function(component, event, helper) {
        helper.showSupportForm(component);
    },
    redirectToDetailPage: function(component, event, helper) {
        let index = event.currentTarget.dataset.index;
        let itemId = component.get("v.selectedOrder.orderItems[" + index + "].Product2Id")
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/detail/' + itemId,
            "isredirect": false
        });
        urlEvent.fire();
    },
});