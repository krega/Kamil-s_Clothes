({
    getProductsFromCart: function(component) {
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
    postAnOrder: function(component) {
        let order = {
            Items: component.get("v.records"),
            BillingStreet: component.get("v.billingStreet"),
            BillingPostalCode: component.get("v.billingPostalCode"),
            BillingState: component.get("v.billingState"),
            BillingCountry: component.get("v.billingCountry"),
            BillingCity: component.get("v.billingCity"),
            TotalPrice: component.get("v.totalPrice")
        };
        let action = component.get("c.postAnOrder");
        action.setParams({
            newOrderPram: JSON.stringify(order)
        });
        action.setCallback(this, function(response) {
            let status = response.getState();
        });
        $A.enqueueAction(action);
    },
    fillOrderModal: function(component) {
        console.log('fillOrderModal');
        let action = component.get("c.getBillingInfo");
        console.log('fillOrderModal');
        action.setCallback(this, function(response) {
            console.log(action);
            let state = response.getState();
            if (state === 'SUCCESS') {
                let products = response.getReturnValue();
                console.log(products);
                component.set("v.billingStreet", products.Address.street);
                component.set("v.billingCountry", products.Address.country);
                component.set("v.billingCity", products.Address.city);
                component.set("v.billingPostalCode", products.Address.postalCode);
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
});