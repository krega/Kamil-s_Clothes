({
    calculateItemsInCart: function(component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let productsInCart = JSON.parse(response.getReturnValue()),
                    productsCount = 0,
                    results = [];
                if ($A.util.isEmpty(productsInCart)) {
                    component.set("v.productCount", productsCount);
                } else {
                    productsInCart.forEach(item => {
                        if (item.count !== 0) {
                            results.push(item);
                            productsCount += item.count;
                        }
                        component.set("v.productCount", productsCount);
                    });
                }
                let setItemAction = component.get("c.setCartElements");
                setItemAction.setParams({
                    cartElements: JSON.stringify(results)
                });
                $A.enqueueAction(setItemAction);
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    component.set('v.toasterType', 'error');
                    component.set('v.toasterTitle', 'Error');
                    component.set('v.toasterMessage', errors[0].message);
                }
            } else {
                component.set('v.toasterType', 'info');
                component.set('v.toasterTitle', state);
                component.set('v.toasterMessage', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    getProductsFromCart: function(component, item, callback) {
        let productsIds = [];
        let productAction = component.get("c.getCartElements");
        productAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let products = JSON.parse(response.getReturnValue());
                if (products !== null) {
                    products.forEach(product => {
                        if (product.count !== 0) {
                            productsIds.push(product.recordId);
                        }
                    });
                }
                let action = component.get("c.getProductsWithPrices");
                action.setParams({
                    productIds: productsIds
                });
                action.setCallback(this, function(response) {
                    let status = response.getState();
                    if (status === 'SUCCESS') {
                        let results = response.getReturnValue(),
                            totalPrice = 0;
                        results.forEach(result => {
                            let countValue = products.filter(data => (
                                result.Product2Id === data.recordId
                            ));
                            result.Count = countValue[0].count;
                            totalPrice += result.Count * result.UnitPrice;
                        });
                        component.set("v.totalPrice", totalPrice);
                        component.set("v.records", results);
                    } else if (state === 'ERROR') {
                        let errors = response.getError();
                        if (errors && Array.isArray(errors) && errors.length > 0) {
                            component.set('v.toasterType', 'error');
                            component.set('v.toasterTitle', 'Error');
                            component.set('v.toasterMessage', errors[0].message);
                        }
                    } else {
                        component.set('v.toasterType', 'info');
                        component.set('v.toasterTitle', state);
                        component.set('v.toasterMessage', response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    component.set('v.toasterType', 'error');
                    component.set('v.toasterTitle', 'Error');
                    component.set('v.toasterMessage', errors[0].message);
                }
            } else {
                component.set('v.toasterType', 'info');
                component.set('v.toasterTitle', state);
                component.set('v.toasterMessage', response.getReturnValue());
            }
        });
        $A.enqueueAction(productAction);
    },
});