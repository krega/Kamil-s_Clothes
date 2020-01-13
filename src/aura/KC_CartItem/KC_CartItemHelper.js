({
    addItemToCart : function (component,item,callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let productsInCart = JSON.parse(response.getReturnValue());
                productsInCart.forEach(item =>{
                    if (item.recordId === component.get("v.record.Product2Id")) {
                        item.count += 1;
                    }
                });
                let setElementAction = component.get("c.setCartElements");
                setElementAction.setParams({cartElements:JSON.stringify(productsInCart)});
                setElementAction.setCallback(this, function (response) {
                    let state = response.getState();
                    if (state === 'SUCCESS'){
                        let addItemEvent = $A.get("e.c:RIF_AddItemToCart");
                        addItemEvent.fire();
                    }else if(state === 'ERROR'){
                        let errors = response.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0){
                            component.set('v.toasterType','error');
                            component.set('v.toasterTitle','Error');
                            component.set('v.toasterMessage',errors[0].message);
                        }
                    }else{
                        component.set('v.toasterType','info');
                        component.set('v.toasterTitle', state);
                        component.set('v.toasterMessage',response.getReturnValue());
                    }
                });
                $A.enqueueAction(setElementAction);
            }else if(state === 'ERROR'){
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0){
                    component.set('v.toasterType','error');
                    component.set('v.toasterTitle','Error');
                    component.set('v.toasterMessage',errors[0].message);
                }
            }else{
                component.set('v.toasterType','info');
                component.set('v.toasterTitle', state);
                component.set('v.toasterMessage',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    removeItemFromCart : function (component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let productsInCart = JSON.parse(response.getReturnValue());
                productsInCart.forEach(item =>{
                    if (item.recordId === component.get("v.record.Product2Id")) {
                        item.count -= 1;
                    }
                });
                let setElementAction = component.get("c.setCartElements");
                setElementAction.setParams({cartElements:JSON.stringify(productsInCart)});
                setElementAction.setCallback(this, function (response) {
                    let state = response.getState();
                    if (state === 'SUCCESS'){
                        let addItemEvent = $A.get("e.c:RIF_AddItemToCart");
                        addItemEvent.fire();
                    }else if(state === 'ERROR'){
                        let errors = response.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0){
                            component.set('v.toasterType','error');
                            component.set('v.toasterTitle','Error');
                            component.set('v.toasterMessage',errors[0].message);
                        }
                    }else{
                        component.set('v.toasterType','info');
                        component.set('v.toasterTitle', state);
                        component.set('v.toasterMessage',response.getReturnValue());
                    }
                });
                $A.enqueueAction(setElementAction);
            }else if(state === 'ERROR'){
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0){
                    component.set('v.toasterType','error');
                    component.set('v.toasterTitle','Error');
                    component.set('v.toasterMessage',errors[0].message);
                }
            }else{
                component.set('v.toasterType','info');
                component.set('v.toasterTitle', state);
                component.set('v.toasterMessage',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});