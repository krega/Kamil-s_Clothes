({
    getView: function(component, event, helper) {

        let productId = component.get("v.recordId");
        let action = component.get("c.getProductInfo");
        action.setParams({
            id: productId
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.product", response.getReturnValue());
                component.set("v.photoPath", "v.product.Product2.PhotoId__c");
                let photoPath = component.get("v.product").Product2.ImgPath__c;
                component.set("v.photoPath", photoPath);
                let productId = component.get("v.product").Product2.Id;
                let photo__c = component.get("v.product.Product2.PhotoId__c")
                component.set("v.photoPath", photo__c);
                this.getAllPhotos(component,  productId);


                             this.getFavorites(component, productId);
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

    getAllPhotos: function(component, productId) {
        let action = component.get("c.productPhotos");
        action.setParams({
            id: productId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.photos", response.getReturnValue());
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
    getPhoto: function(component, event) {
        let photoIndex = event.currentTarget.dataset.id;
        let photos = component.get("v.photos");
        let selectedPhoto = photos[photoIndex];
        component.set("v.photoPath", selectedPhoto.ImgUrl__c);
    },
    getPrices: function(component, item, callback) {
        let action = component.get("c.getProductPrices");
        action.setParams({
            productId: component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                component.set("v.price", response.getReturnValue())
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
    addNewItemToCard: function(component, item, callback) {
        let action = component.get("c.getCartElements");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let tmp = JSON.parse(response.getReturnValue());
                if (tmp === null) {
                    tmp = [];
                    tmp.push({
                        recordId: component.get("v.recordId"),
                        count: 1
                    });
                } else {
                    let containsItem = tmp.filter(data => (data.recordId === component.get("v.recordId")));
                    if (containsItem.length !== 0) {
                        tmp.forEach(item => {
                            if (item.recordId === component.get("v.recordId")) {
                                item.count += 1;
                            }
                        });
                    } else {
                        tmp.push({
                            recordId: component.get("v.recordId"),
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
 getOldPrice : function (component, item, callback) {
             let sURLVariables = window.location.pathname.split('/');
            let action = component.get("c.getNormalPrice");
            let name = component.get("v.recordId")
            action.setParams({query:name});
            action.setCallback(this, function (response) {
                let state = response.getState();
                if (state === 'SUCCESS'){
                    console.log(response.getReturnValue())
                    component.set("v.oldPrice",response.getReturnValue());

                }
            });
            $A.enqueueAction(action);
        },


         favorites: function(component){
                let product = component.get("v.product");
                let productId = product.Product2.Id;
                let productPrice =  component.get("v.oldPrice[0].UnitPrice");
                  let entry = product.Id;
                let action = component.get("c.addToFavouritesList");
                action.setParams({
                    id : productId,
                    price : productPrice,
                });
                action.setCallback(this, function(response){
                    let state = response.getState();
                    if (state === "SUCCESS"){
                         let operationResult = response.getReturnValue();
                        this.getFavorites(component, productId);
                    }
                    else if (state === "ERROR"){
                        let errors = response.getError();
                        let message,
                             title ='error'
                        if (errors) {
                             if (errors[0] && errors[0].message){
                                   message = errors[0].message;
                                   component.find("toastCmp").toast(title, "error", message);
                             }
                        }
                        else {
                             message = 'unknown'
                             component.find("toastCmp").toast(title, "error", message);
                        }
                    }
                });
                $A.enqueueAction(action);
            },

   getFavorites: function(component, productId){
        let action = component.get("c.checkFavouriteProduct");
        action.setParams({
             id : productId
        });
        action.setCallback(this, function(response){
        let state = response.getState();
        if (state === "SUCCESS"){
            let favorites = response.getReturnValue();
           if(favorites != null){
                           this.checkIsInFavourites(component, favorites);
                       }
        }
        else if (state === "ERROR"){
              let errors = response.getError();
              let message,
                   title = 'error';
              if (errors){
                    if (errors[0] && errors[0].message){
                          message = errors[0].message;
                          component.find("toastCmp").toast(title, "error", message);
                    }
              }
              else{
                     message ='unknown';
                     component.find("toastCmp").toast(title, "error", message);
              }
        }
        });
        $A.enqueueAction(action);
    },
        checkIsInFavourites: function(component, favorites){
            let recordID = component.get("v.recordId");
                 console.log(recordID);
            for(let i = 0; i < favorites.length; i++){
                  console.log('favorites' + favorites[i].Product__c);
                if(favorites[i].Product__c===recordID){
                    component.set("v.isFavorite", true);
                    break;
                }
                else{
                    component.set("v.isFavorite", false);
                }
            }
        },
})