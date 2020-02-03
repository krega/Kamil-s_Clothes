
({
    search: function(component){
        let action = component.get("c.getSearchResults");
        action.setParams({
        name : component.get("v.searchItemName"),
        city: component.get("v.searchItemCity"),
        country: component.get("v.searchItemCountry")});
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.resultList", response.getReturnValue());
                component.set("v.mapPointers", response.getReturnValue());
             }
              else if (state === "ERROR") {
              this.showToastError(component, event, helper);
              }
        });
                $A.enqueueAction(action);
    },


    display: function(component, event){
         let divisionId = event.currentTarget.dataset.id;
        component.set("v.divisionId",divisionId);
     },

    onDelete: function(component, event, helper){
        let action = component.get("c.deleteDivision"),
        account = component.get("v.selectedRecord");
        action.setParams({
           id: account.Id
         });
     let isSuccess;
     action.setCallback(this, function(response){
     let state = response.getState();
     component.set("v.deleteIsOpen", false);
     component.set("v.selectedRecord", null);
         if(state === "SUCCESS"){
            component.set("v.operationSuccess", true);
            component.set("v.operationFailed", false);
          this.showToastSuccess(component, event, helper);
         } else {
                component.set("v.operationFailed", true);
                component.set("v.operationSuccess", false);
               this.showToastError(component, event, helper);
               }
      });
           $A.enqueueAction(action);
           this.search(component);
     },
          handleUpdateEvent: function(component, event, helper){
                         let resultList = component.get("v.resultList");
                         for(let i = 0; i<resultList.length; i++){
                             if(resultList[i].Id == event.getParam("accountID")){
                                 resultList[i].Id = event.getParam("accountID");
                                 resultList[i].Name = event.getParam("accountName");
                                 resultList[i].ShippingStreet = event.getParam("accountStreet");
                                 resultList[i].ShippingCity = event.getParam("accountCity");
                                 resultList[i].ShippingCountry = event.getParam("accountCountry");
                                 resultList[i].ShippingState = event.getParam("accountState");
                                 resultList[i].ShippingPostalCode = event.getParam("accountPostalCode");
                                 component.set("v.resultList", resultList);
                                 }
                              }
                      if(event.getParam("accountID") != null){
                          component.set("v.divisionId", event.getParam("accountID"));
                          let selected = component.get("v.selectedRecord");
                          let detail = [];
                          detail.push(selected);
                          component.set("v.mapPointers", detail);
                          }
             },
             showToastSuccess: function( component, event, helper ){
                   let toastEvent = $A.get("e.force:showToast");
                   toastEvent.setParams({
                    "title": $A.get("{!$Label.c.KC_OK}"),
                    "message":  $A.get("{!$Label.c.KC_OperationIsOK}")
                     });
                     toastEvent.fire();
                     },

                 showToastError : function(component, event, helper) {
                     let toastEvent = $A.get("e.force:showToast");
                     toastEvent.setParams({
                     "title":  $A.get("{!$Label.c.KC_Error}"),
                      "message": $A.get("{!$Label.c.KC_OperationFailed}")
                  });
                     toastEvent.fire();
                },
})
