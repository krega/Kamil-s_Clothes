({
      prepareProductView: function(component, event, helper){
          let productId = component.get("v.recordId");
          let action = component.get("c.getProductInfo");
          action.setParams({
              id : productId
          });
          action.setCallback(this, function(response) {
          var state = response.getState();
          if (state === "SUCCESS"){
               component.set("v.product", response.getReturnValue());
                component.set("v.photoPath", "v.product.Product2.PhotoId__c");
   console.log( component.get("v.product"));
               let photoPath = component.get("v.product").Product2.ImgPath__c;
               component.set("v.photoPath", photoPath);
               let productId = component.get("v.product").Product2.Id;
              let photo__c= component.get("v.product.Product2.PhotoId__c")
               component.set("v.photoPath", photo__c);
               this.getPhotos(component, event, helper, productId);
          }  else if (state === "ERROR") {
            console.log(response.getError());
            }
            });
            $A.enqueueAction(action);
                },
                                getPhotos: function(component, event, helper, productId){
                                            let action = component.get("c.productPhotos");
                                            action.setParams({
                                                 id : productId
                                            });
                                            action.setCallback(this, function(response) {
                                            var state = response.getState();
                                            if (state === "SUCCESS"){
                                                  component.set("v.photos", response.getReturnValue());
                                            }

                                            });
                                            $A.enqueueAction(action);
                                        },
                                        getPhoto: function(component, event, helper){
                                                let photoIndex = event.currentTarget.dataset.id;
                                                let photos = component.get("v.photos");
                                                let selectedPhoto = photos[photoIndex];
                                                component.set("v.photoPath", selectedPhoto.ImgUrl__c);
                                            },
                                            getPhoto: function(component, event, helper){
                                                    let photoIndex = event.currentTarget.dataset.id;
                                                    let photos = component.get("v.photos");
                                                    let selectedPhoto = photos[photoIndex];
                                                    component.set("v.photoPath", selectedPhoto.ImgUrl__c);
                                                },
            getPrices : function (component, item, callback) {
                let action = component.get("c.getProductPrices");
                action.setParams({productId:component.get("v.recordId")});
                action.setCallback(this,function (response) {
                    let state = response.getState();
                    if (state === 'SUCCESS'){
                        component.set("v.price",response.getReturnValue())
                    }
                    else if(state === 'ERROR'){
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

            },
              addNewItemToCard : function (component, item, callback) {
                    let action = component.get("c.getCartElements");
                    action.setCallback(this,function (response) {
                        let state = response.getState();
                        if (state === 'SUCCESS'){
                            let tmp = JSON.parse(response.getReturnValue());
                            if (tmp === null){
                                tmp = [];
                                tmp.push({recordId:component.get("v.recordId"),count:1});
                            }else{
                                let containsItem = tmp.filter(data => (data.recordId === component.get("v.recordId")));
                                if (containsItem.length !== 0){
                                    tmp.forEach(item =>{
                                        if (item.recordId === component.get("v.recordId")){
                                            item.count += 1;
                                        }
                                    });
                                }else{
                                    tmp.push({recordId:component.get("v.recordId"),count:1});
                                }
                            }
                            let setItemAction = component.get("c.setCartElements");
                            setItemAction.setParams({cartElements:JSON.stringify(tmp)});
                            setItemAction.setCallback(this,function(response){
                                let state = response.getState();
                                if (state === 'SUCCESS'){
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
                            let addItemEvent = $A.get("e.c:KC_AddItemToCart");
                            addItemEvent.fire();
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
                },




})