({
    doInit: function(component, event, helper) {
        console.log('doInit');
        helper.getFavouriteProducts(component);
    },
    redirectToHome: function() {
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/s/',
            "isredirect": false
        });
        urlEvent.fire();
    },
    redirectToDetailPage: function(component, event, helper) {
        console.log(component.get('v.items'))
        let index = event.currentTarget.dataset.index;
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/detail/' + component.get("v.record.Product2.Id"),
            "isredirect": false
        });
        urlEvent.fire();
    },
})