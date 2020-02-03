({
    getOldPrice: function(component, item, callback) {
        let action = component.get("c.getNormalPrice");
        let name = component.get("v.record.Product2.Id");
        action.setParams({
            query: name
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                component.set("v.oldPrice", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    remove: function(component, item, callback) {
        let action = component.get("c.removeFromFavourites");

        let recordId =component.get("v.record.Product2.Id");
        console.log(recordId);
        action.setParams({
            id: recordId
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                console.log('fire');
                let removeItem = $A.get("e.c:KC_RefreshFavouriteList");
                console.log('fire1');
                removeItem.fire();
            console.log('fire2');
            }
        });
        $A.enqueueAction(action);
    },

    addNewItemToCard: function(component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                console.log('dupa');
                let tmp = JSON.parse(response.getReturnValue());
                if (tmp === null) {
                    tmp = [];
                    tmp.push({
                        recordId: component.get("v.record.Product2.Id"),
                        count: 1
                    });
                } else {
                    let containsItem = tmp.filter(data => (data.recordId === component.get("v.record.Product2.Id")));
                    if (containsItem.length !== 0) {
                        tmp.forEach(item => {
                            if (item.recordId === component.get("v.record.Product2.Id")) {
                                item.count += 1;
                            }
                        });
                    } else {
                        tmp.push({
                            recordId: component.get("v.record.Product2.Id"),
                            count: 1
                        });
                    }
                }
                let setItemAction = component.get("c.setCartElements");
                setItemAction.setParams({
                    cartElements: JSON.stringify(tmp)
                });
                setItemAction.setCallback(this, function(response) {
                    let state = response.getState();
                    if (state === 'SUCCESS') {} else if (state === 'ERROR') {
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
                $A.enqueueAction(setItemAction);
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
        $A.enqueueAction(action);
    },
})