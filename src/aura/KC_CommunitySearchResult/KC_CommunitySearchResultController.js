({
     doInit : function (component, event,helper) {
            console.log(component.get("v.item.Name"));
            helper.getOldPrice(component);
        },
    redirectToDetailPage : function (component, event, helper) {
        console.log(component.get('v.items'))
        let index = event.currentTarget.dataset.index;
        let urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": '/detail/'+index,
            "isredirect":false
        });
        urlEvent.fire();
    },

   });