({
    doInit: function(component) {
        var action = component.get('c.getUserCases');
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var cases = response.getReturnValue();
                component.set('v.userCases', cases);
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
    getComments: function(component) {
        let action = component.get('c.getComments');
        let CaseId = component.get('v.selectedOrder.Id');
        action.setParams({
            CaseId: CaseId
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                let comment = response.getReturnValue();
                component.set('v.commentCase', comment);
                console.log(component.get('v.commentCase'));
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