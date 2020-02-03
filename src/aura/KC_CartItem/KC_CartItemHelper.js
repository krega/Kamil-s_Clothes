({
    addItemToCart: function(component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let productsInCart = JSON.parse(response.getReturnValue());
                productsInCart.forEach(item => {
                    if (item.recordId === component.get("v.record.Product2Id")) {
                        item.count += 1;
                    }
                });
                let setElementAction = component.get("c.setCartElements");
                setElementAction.setParams({
                    cartElements: JSON.stringify(productsInCart)
                });
                setElementAction.setCallback(this, function(response) {
                    let state = response.getState();
                    if (state === 'SUCCESS') {
                        let addItemEvent = $A.get("e.c:KC_AddItemToCart");
                        addItemEvent.fire();
                    } else if (state === 'ERROR') {
                        let errors = response.getError();
                        title = $A.get("$Label.c.KC_Error");
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                            component.find("toastCmp").toast(title, "error", message);

                        }
                    } else {

                        message = $A.get("$Label.c.KC_UnknownError");
                        component.find("toastCmp").toast(title, "error", message);
                    }
                });
                $A.enqueueAction(setElementAction);
            } else if (state === 'ERROR') {
                let errors = response.getError();
                title = $A.get("$Label.c.KC_Error");
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                    component.find("toastCmp").toast(title, "error", message);
                }
            } else {

                message = $A.get("$Label.c.KC_UnknownError");
                component.find("toastCmp").toast(title, "error", message);
            }
        });
        $A.enqueueAction(action);
    },
    removeItemFromCart: function(component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let productsInCart = JSON.parse(response.getReturnValue());
                productsInCart.forEach(item => {
                    if (item.recordId === component.get("v.record.Product2Id")) {
                        item.count -= 1;
                    }
                });
                let setElementAction = component.get("c.setCartElements");
                setElementAction.setParams({
                    cartElements: JSON.stringify(productsInCart)
                });
                setElementAction.setCallback(this, function(response) {
                    let state = response.getState();
                    if (state === 'SUCCESS') {
                        let addItemEvent = $A.get("e.c:KC_AddItemToCart");
                        addItemEvent.fire();
                    } else if (state === 'ERROR') {
                        let errors = response.getError();
                        title = $A.get("$Label.c.KC_Error");
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            message = errors[0].message;
                            component.find("toastCmp").toast(title, "error", message);
                        }
                    } else {

                        message = $A.get("$Label.c.KC_UnknownError");
                        component.find("toastCmp").toast(title, "error", message);
                    }
                });
                $A.enqueueAction(setElementAction);
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                    component.find("toastCmp").toast(title, "error", message);
                }
            } else {
                message = $A.get("$Label.c.KC_UnknownError");
                component.find("toastCmp").toast(title, "error", message);
            }
        });
        $A.enqueueAction(action);
    },

   getOldPrice : function (component, item, callback) {
               let action = component.get("c.getNormalPrice");
               let name = component.get("v.record.Product2.Id");
                console.log(component.get("v.record.Product2.Id"));
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

});