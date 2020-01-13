({
    doInit : function (component, event, helper) {
        let toasterMessage = component.get('v.toasterMessage');
        let toasterType = component.get('v.toasterType');
        let toasterTitle = component.get('v.toasterTitle');
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : toasterTitle,
            message: toasterMessage,
            type: toasterType,
            mode: 'sticky'
        });
        toastEvent.fire();
    }
})