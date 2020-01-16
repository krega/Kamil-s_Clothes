({
    cancelCase: function (component) {
        component.set('v.caseSubject', '');
        component.set('v.caseDescription', '');
        component.set('v.showForm', false);
    },
    createCase: function (component) {
        var orderId = component.get('v.orderId');
        var caseSubject = component.get('v.caseSubject');
        var caseDescription = component.get('v.caseDescription');


        var action = component.get('c.createNewCase');
        action.setParams({
            orderId: orderId,
            caseSubject: caseSubject,
            caseDescription: caseDescription
        });

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var successToast = $A.get('e.force:showToast');
                successToast.setParams({
                    'title': 'Success',
                    'type': 'success',
                    'message': 'New case has been created' + errorsMessage
                });
                successToast.fire();
            }
            else{
                var errors = response.getError();
                var errorsMessage = '';
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errorsMessage = errors[0].message;
                }
                var failedToast = $A.get('e.force:showToast');
                failedToast.setParams({
                    'title': 'Failure',
                    'type': 'error',
                    'message': 'An error has occurred while retrieving details of your order' + errorsMessage
                });
                failedToast.fire();
            }
        });

        $A.enqueueAction(action);
    }
})