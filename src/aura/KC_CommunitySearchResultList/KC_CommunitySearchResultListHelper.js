({
    getProductsByQuery : function (component, item, callback) {
         let sURLVariables = window.location.pathname.split('/');
        let action = component.get("c.getProductsByName");
        action.setParams({query:sURLVariables[3]});
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === 'SUCCESS'){
                console.log(response.getReturnValue())
                component.set("v.results",response.getReturnValue());
                console.log(component.get("v.results"));
            }
        });
        $A.enqueueAction(action);
    }
});