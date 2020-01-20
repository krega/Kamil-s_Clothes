({
    getAllOrders : function (component, item, callback) {
        let action = component.get("c.getUserOrders");
        action.setCallback(this, function (response) {
           let state = response.getState();
           if (state === 'SUCCESS'){
               console.log(response.getReturnValue());
               component.set("v.allOrders",response.getReturnValue());
           }
        });
        $A.enqueueAction(action);
    },
     showSupportForm: function (component) {
            component.set('v.showSupportForm', true)
        },
});