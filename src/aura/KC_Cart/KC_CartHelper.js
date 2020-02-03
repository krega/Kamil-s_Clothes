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
    getProductsFromCart: function(component, callback) {
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
                         title = $A.get("$Label.c.KC_Error");
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
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                     component.find("toastCmp").toast(title, "error", message);
                }
            } else {
                 component.find("toastCmp").toast(title, "error", message);
            }
        });
        $A.enqueueAction(productAction);
    },
});