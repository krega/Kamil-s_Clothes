({
    calculateItemsInCart : function (component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this,function (response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let productsInCart = JSON.parse(response.getReturnValue()),
                    productsCount = 0,
                    results = [];
                if ($A.util.isEmpty(productsInCart)){
                    component.set("v.productCount",productsCount);
                } else {
                    productsInCart.forEach(item => {
                        if (item.count !== 0){
                            console.log("count nie równy 0");
                            results.push(item);
                            productsCount += item.count;

                        }
                        component.set("v.productCount",productsCount);
                    });
                }
                let setItemAction = component.get("c.setCartElements");
                setItemAction.setParams({
                    cartElements:JSON.stringify(results)
                });
                setItemAction.setCallback(this, function (response) {
                    let state = response.getState();
                    if (state === 'SUCCESS'){
                        // console.log(response.getReturnValue());
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
                $A.enqueueAction(setItemAction);
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