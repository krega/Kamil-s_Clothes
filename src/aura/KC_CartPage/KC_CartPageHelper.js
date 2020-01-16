({
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
    postAnOrder: function(component, item, callback) {
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
            if (status === 'SUCCESS') {
                component.set("v.orderModal", false);
                component.set('v.toasterType', 'info');
                component.set('v.toasterTitle', 'Item was ordered');
                component.set('v.toasterMessage', 'You can check status of your oder in Order tab');
                let urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": '/s/',
                    "isredirect": false
                });
                urlEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },

    fillOrderModal: function(component, item, callback) {
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
            } else {
                component.set('v.toasterType', 'info');
                component.set('v.toasterTitle', state);
                component.set('v.toasterMessage', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },


});