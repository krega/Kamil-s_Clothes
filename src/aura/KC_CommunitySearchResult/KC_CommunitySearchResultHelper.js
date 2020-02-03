/**
 * Created by BRITENET on 22.01.2020.
 */
({
getOldPrice : function (component, item, callback) {
             let sURLVariables = window.location.pathname.split('/');
            let action = component.get("c.getNormalPrice");
            let name = component.get("v.item.Product2.Id")
            action.setParams({query:name});
            action.setCallback(this, function (response) {
                let state = response.getState();
                if (state === 'SUCCESS'){

                    component.set("v.oldPrice",response.getReturnValue());
                    console.log(component.get("v.oldPrice"));
                }
            });
            $A.enqueueAction(action);
        },
})