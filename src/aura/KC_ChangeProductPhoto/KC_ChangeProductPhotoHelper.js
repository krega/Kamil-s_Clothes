({
    getPhotos: function(component){
          let recordId = component.get("v.recordId");
          let action = component.get("c.productPhotos");
          action.setParams({
              id : recordId
          });
          action.setCallback(this, function(response){
          let state = response.getState();
          if (state === "SUCCESS"){
              let photos = response.getReturnValue();
              console.log(photos);
              component.set("v.photos", photos);
              this.getMainPhotoUrl(component, recordId, photos);
          }

          });
          $A.enqueueAction(action);
    },
    getMainPhotoUrl: function(component, recordId, photos){
        let action = component.get("c.getMainPhotoUrl");
        action.setParams({
             id : recordId
        });
        action.setCallback(this, function(response){
             let state = response.getState();
             if (state === "SUCCESS"){
                  let url = response.getReturnValue();
                  component.set("v.mainPhotoUrl", url);
                  console.log('url' + url);
                  this.checkIsMainPhoto(component, photos, url);
             }

        });
        $A.enqueueAction(action);
    },
    checkIsMainPhoto: function(component, photos, mainPhotoUrl){
        let index;
        for(let i = 0; i < photos.length; i++){
            if(photos[i].ImgUrl__c === mainPhotoUrl){
                index = i;
                component.set("v.mainPhotoIndex", index);
            }
        }
        this.setClass(component, index);
    },
    setClass: function(component, index){
        let photos = component.find("productImg");
        for(let i = 0; i < photos.length; i++){
            let itemId = photos[i].getElement().getAttribute("data-id");
            if(itemId != index){
                $A.util.removeClass(photos[i], "chosenPhoto");
            }
            else{
                $A.util.addClass(photos[i], "chosenPhoto");
            }
        }
    },
    setPhoto: function(component, event){
        console.log('dupa');
        let index = event.currentTarget.dataset.id;
        let photos = component.get("v.photos");
        let mainPhoto = photos[index];
        let url = mainPhoto.ImgUrl__c;
        let recordId = component.get("v.recordId");
        let action = component.get("c.setMainPhoto");
        action.setParams({
            url : url,
            productId : recordId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                 this.setClass(component, index);
            }

        });
        $A.enqueueAction(action);
    }
})