({
    getAllDiscounts: function(component, item, callback) {
        let action = component.get("c.getAllDiscounts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                component.set("v.discounts", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    getProductsToDiscount: function(component, item, callback) {
        let action = component.get("c.getAllProducts");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let results = response.getReturnValue();
                results.forEach(result => {
                    result.Checked = false;
                });
                component.set("v.products", results);
                component.set("v.searchProducts", results);
                this.getBasicPrice(component);
            }
        });
        $A.enqueueAction(action);
    },

    getBasicPriceForItems: function(component, item) {
        for (let i = 0; i < item.priceEntries.length; i++) {
            let action = component.get("c.getNormalPrice");
            action.setParams({
                query: item.priceEntries[i].Product2Id
            });
            console.log(item.priceEntries[i].Product2Id);
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === 'SUCCESS') {
                    let results = response.getReturnValue();
                    item.priceEntries[i].basicValue = results[0].UnitPrice;
                }
                component.set("v.selectedDiscount", item);
            });
            $A.enqueueAction(action);
            component.set("v.selectedDiscount", item);
        }
    },

    getBasicPrice: function(component, item, callback) {
        let allProducts = component.get("v.searchProducts");
        for (let i = 0; i < allProducts.length; i++) {
            let action = component.get("c.getNormalPrice");
            action.setParams({
                query: allProducts[i].Id
            });
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === 'SUCCESS') {
                    let results = response.getReturnValue();
                    allProducts[i].basicValue = results[0].UnitPrice;
                } else if (state === 'ERROR') {}

            });
            $A.enqueueAction(action);
        }
    },

    addNewDiscountRecord: function(component, item, callback) {
        let action = component.get("c.createNewDiscount");
        action.setParams({
            discountedProductIds: component.get("v.selectedProductIds"),
            name: component.get("v.discountName"),
            discountType: component.get("v.discountType"),
            discountValue: component.get("v.discountValue"),
            startDate: component.get("v.discountStartdate"),
            endDate: component.get("v.discountEnddate"),
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                $A.enqueueAction(component.get('c.closeModal'));
                $A.enqueueAction(component.get('c.doInit'));
            }
        });
        $A.enqueueAction(action);
    },

    updateNewDiscountRecord: function(component, item, callback) {
        let selected = component.get("v.selectedProducts");
        let arr = new Array();
        let specialPrice = new Array();
        let specialDiscountArr = new Array()
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].addToSpecialDiscount === 0) {
                arr.push(selected[i].Id);
            } else {
                specialDiscountArr.push(selected[i].Id);
                specialPrice.push(selected[i].specialDiscount);
            }
        }
        for (let i = 0; i < specialDiscountArr.length; i++) {
            let action = component.get("c.createList");
            action.setParams({
                id: component.get("v.discountsId"),
                discountedProductIds: specialDiscountArr,
                discountType: component.get("v.discountType"),
                discountValue: specialPrice[i],
            });
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === 'SUCCESS') {} else if (state === 'ERROR') {}
            });
            $A.enqueueAction(action);
        }
        let action = component.get("c.updateDiscountFromModal");
        action.setParams({
            id: component.get("v.discountsId"),
            discountedProductIds: arr,
            name: component.get("v.discountName"),
            discountType: component.get("v.discountType"),
            discountValue: component.get("v.discountValue"),
            startDate: component.get("v.discountStartdate"),
            endDate: component.get("v.discountEnddate")
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                $A.enqueueAction(component.get('c.closeModal'));
                $A.enqueueAction(component.get('c.doInit'));
            } else if (state === 'ERROR') {}
        });
        $A.enqueueAction(action);

    },

    getAllDiscountsWithProducts: function(component, item, callback) {
        let action = component.get("c.getDiscountItems");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                component.set("v.discountsWithProducts", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    deleteSelectedDiscount: function(component, recordId) {
        let action = component.get("c.deleteSelectedDiscount");
        action.setParams({
            recordToDelete: recordId
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                $A.enqueueAction(component.get('c.doInit'));
                component.set("v.selectedDiscount", []);
            }
        });
        $A.enqueueAction(action);
    },

    updateDiscount: function(component, recordId) {
        let action = component.get("c.getDiscountByID");
        action.setParams({
            id: recordId
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let selectedDiscount = response.getReturnValue();
                this.getProducts(component, recordId);
                component.set("v.discountName", selectedDiscount.Name);
                component.set("v.discountType", selectedDiscount.DiscountType__c);
                console.log(component.get("v.discountType"));
                component.set("v.discountValue", selectedDiscount.DiscountValue__c);
                component.set("v.discountStartdate", selectedDiscount.BeginDate__c);
                component.set("v.discountEnddate", selectedDiscount.EndDate__c);
                component.set("v.showDiscountType", true);
                component.set("v.showModal", true);
            }
        });
        $A.enqueueAction(action);
    },

    getProducts: function(component, recordId) {
        component.get("v.searchProducts");
        let productsAlreadyAdded = component.get("v.searchProducts");
        let action = component.get("c.getRelatedItems");
        action.setParams({
            id: recordId
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let products = response.getReturnValue();
                let arr = new Array(products.length);
                for (let i = 0; i < products.length; i++) {
                    arr[i] = products[i].Product2;
                    arr[i].DiscountPrice = products[i].UnitPrice;
                }
                let arrId = new Array(products.length);
                for (let i = 0; i < products.length; i++) {
                    arrId[i] = products[i].Product2.Id;

                }
                for (let i = 0; i < arrId.length; i++) {
                    let action = component.get("c.getNormalPrice");
                    action.setParams({
                        query: arrId[i]
                    });
                    action.setCallback(this, function(response) {
                        let state = response.getState();
                        if (state === 'SUCCESS') {
                            let results = response.getReturnValue();
                            arr[i].basicValue = results[0].UnitPrice;
                            arr[i].addToSpecialDiscount = 0;
                        } else if (state === 'ERROR') {}
                    });
                    $A.enqueueAction(action);
                }
                let selectedProducts = component.get("v.selectedProducts");
                for (let i = 0; i < productsAlreadyAdded.length; i++) {
                    for (let z = 0; z < arrId.length; z++) {
                        if (productsAlreadyAdded[i].Id === arrId[z]) {
                            productsAlreadyAdded[i].inputChecked = true;
                            component.set("v.selectedProducts[i].basicValue", productsAlreadyAdded[i].basicValue);
                        }
                    }
                }
                component.set("v.selectedProductIds", arrId);
                component.set("v.selectedProducts", arr);
                component.set("v.searchProducts", productsAlreadyAdded);
            }
        });
        $A.enqueueAction(action);
    },
});
