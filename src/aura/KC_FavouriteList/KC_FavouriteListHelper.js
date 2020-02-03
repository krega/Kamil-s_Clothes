({
    getFavouriteProducts: function(component) {
        let productsIds = [];
        let productAction = component.get("c.getFavouriteProduct");
        productAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let products = response.getReturnValue();
                if (products !== null) {
                    products.forEach(product => {
                        productsIds.push(product.Product__c);
                    });
                }
                let action = component.get("c.getProductsWithPrices");
                action.setParams({
                    productIds: productsIds
                });
                action.setCallback(this, function(response) {
                    let status = response.getState();
                    if (status === 'SUCCESS') {
                        let results = response.getReturnValue();
                        component.set("v.record", results);
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
        $A.enqueueAction(productAction);
    },

})