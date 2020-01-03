({
  onSuccess: function( component, event, helper ){
  component.set("v.showToast", true);
  component.set("v.isUpsertDisplay", false);
  helper.showToastSuccess(component, event, helper);
   let compEvent = component.getEvent("refreshResultList");
   compEvent.setParams({"changeFlag" : true ,
    "accountID" : component.get("v.accountID"),
     "accountName" : component.get("v.accountName"),
      "accountStreet" : component.get("v.accountStreet"),
      "accountCity" : component.get("v.accountCity"),
      "accountPostalCode" : component.get("v.accountPostalCode"),
      "accountState" : component.get("v.accountState"),
      "accountState" : component.get("v.accountState"),

    });
    compEvent.fire();
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

     onSubmit : function(component, event, helper){
        let fields = event.getParam("fields"),
        account = component.get("v.account");
         if(account != null){
             component.set("v.accountID", account.Id);
            }
         component.set("v.accountName", fields["Name"]);
         component.set("v.accountStreet", fields["ShippingStreet"]);
         component.set("v.accountCity", fields["ShippingCity"]);
         component.set("v.accountCountry", fields["ShippingCountry"]);
         component.set("v.accountPostalCode", fields["ShippingState"]);
         component.set("v.accountState", fields["ShippingPostalCode"]);
    }

})