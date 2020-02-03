({
    doInit: function(component, event, helper) {
        helper.getAllDiscounts(component);
        helper.getProductsToDiscount(component);
        helper.getAllDiscountsWithProducts(component);
    },

    specialDiscount: function(component, event, helper) {
        let index = event.currentTarget.dataset.index;
        let product = component.get("v.selectedProducts");
          let discountType = component.get("v.discountType");
            let action = component.get("c.getDiscountedProductPrice");
                  action.setParams({
                      currentPrice: product[index].basicValue,
                      discountType : discountType   ,
                      discountValue : product[index].specialDiscount,
                  });
                  action.setCallback(this, function(response) {
                      let state = response.getState();
                      if (state === 'SUCCESS') {
                          let selectedDiscount = response.getReturnValue();
                         product[index].DiscountPrice = selectedDiscount;
                          product[index].addToSpecialDiscount = true;
                         component.set("v.selectedProducts",product );
                      }
                  });
                  $A.enqueueAction(action);
  },
    showModal: function(component, event, helper) {
        component.set("v.selectedProducts", []);
        component.set("v.selectedProductIds", []);
        component.set("v.filterFamily", "");
        component.set("v.filterName", "");
        component.set("v.filterProducer", "");
        component.set("v.discountName", "");
        component.set("v.discountType", "Percent");
        component.set("v.discountValue", 0);
        component.set("v.discountStartdate", "");
        component.set("v.discountEnddate", "");
        component.set("v.showDiscountType", true);
        component.set("v.showModal", true);
    },
    closeModal: function(component, event, helper) {
      helper.getAllDiscounts(component);
      helper.getProductsToDiscount(component);
      helper.getAllDiscountsWithProducts(component);
      component.set("v.discountsId",null);
      component.set("v.showModal", false);
    },
    filterProducts: function(component, event, helper) {
        let products = component.get("v.products");
        let filterFamily = component.get("v.filterFamily");
        let filterName = component.get("v.filterName");
        let filterProducer = component.get("v.filterProducer");
        let result = [];
        let productsForSearch = products.forEach(item => {
            if (!$A.util.isEmpty(filterName) || !$A.util.isEmpty(filterFamily) || !$A.util.isEmpty(filterProducer)) {
                if (item.Name.toLowerCase().startsWith(filterName) || item.Family.toLowerCase().startsWith(filterFamily) || item.Producent__c.toLowerCase().startsWith(filterProducer)) {
                    result.push(item);
                }
            }
        });
        if ($A.util.isEmpty(result)) {
            component.set("v.searchProducts", products);
        } else {
            component.set("v.searchProducts", result);
        }
    },
    addItemToDiscount: function(component, event, helper) {
        let selectedProducts = component.get("v.selectedProducts");
        let selectedProductIds = component.get("v.selectedProductIds");
        let carId = event.getSource().get("v.value");
        let products = component.get("v.products");
        if (event.getSource().get("v.checked")) {
            let selectedProduct = products.filter(product => {
                product.addToSpecialDiscount=0;
                if (product.Id === carId) {
                    return product;
                }
            });
            selectedProducts.push(selectedProduct[0]);
            selectedProductIds.push(selectedProduct[0].Id)
           component.set("v.selectedProducts", selectedProducts);
            component.set("v.selectedProductIds", selectedProductIds);

        } else {
            let removed = selectedProducts.filter((value, index) => {
                if (value.Id === carId) {
                    return value;
                }
            });
            let filtredProducts = selectedProducts.filter(e => {
                return e.Id !== removed[0].Id
            });
            let filtredProductsIds = [];
            filtredProducts.forEach(product => {
                filtredProductsIds.push(product.Id)
            });

            component.set("v.selectedProducts", filtredProducts);
            component.set("v.selectedProductIds", filtredProductsIds);
        }
    },
    toogleDiscountType: function(component, event, helper) {
        let percentBtn = component.find("percent");
        let amountBtn = component.find("amount");
        if (event.getSource().get("v.label") === 'Percent') {
            if (event.getSource().get("v.variant") === 'neutral') {
                percentBtn.set("v.variant", "brand");
                amountBtn.set("v.variant", "neutral");
                component.set("v.showDiscountType", true);
                component.set("v.discountType", "Percent");
            }
        } else {
            if (event.getSource().get("v.variant") === 'neutral') {
                amountBtn.set("v.variant", "brand");
                percentBtn.set("v.variant", "neutral");
                component.set("v.showDiscountType", false);
                component.set("v.discountType", "Amount");
            }
        }
    },
    addNewDiscount: function(component, event, helper) {
      component.set("v.discountsId",null);
      helper.addNewDiscountRecord(component);
      helper.getAllDiscounts(component);
      helper.getProductsToDiscount(component);
      helper.getAllDiscountsWithProducts(component);
      component.set("v.selectedProducts",[]);
      component.set("v.selectedProductIds",[]);
    },

     updateSelectedDiscount: function(component, event, helper) {
      helper.updateNewDiscountRecord(component);
     component.set("v.discountsId",null);
     },

    showDetails: function(component, event, helper) {
        let recordId = event.currentTarget.dataset.record;
        let discounts = component.get("v.discountsWithProducts");
        helper.getBasicPriceForItems(component, discounts[recordId]);
    },
    deleteDiscount: function(component, event, helper) {
        let recordToDelete = event.getSource().get("v.value");
        helper.deleteSelectedDiscount(component, recordToDelete);
    },
    updateDiscount: function(component, event, helper) {
        let recordToDelete = event.getSource().get("v.value");
        component.set("v.discountsId", recordToDelete);
       helper.updateDiscount(component, recordToDelete);
    },
});