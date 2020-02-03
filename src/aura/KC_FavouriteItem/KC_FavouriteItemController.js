({
    doInit: function(component, event, helper) {
        helper.getOldPrice(component);
    },
    addToCart: function(component, event, helper) {
        helper.addNewItemToCard(component);
    },
    removeFromFavourite: function(component, event, helper) {
        helper.remove(component);
    },
    redirectToDetailPage: function(component, event, helper) {
        console.log(component.get('v.record.Product2.Id'))
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/detail/' + component.get('v.record.Product2.Id'),
            "isredirect": false
        });
        urlEvent.fire();
    },

})