({
    doInit: function (component) {
        var action = component.get('c.getUserCases');

        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                var cases = response.getReturnValue();
                component.set('v.userCases', cases);
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
                    'message': 'An error has occurred while retrieving cases' + errorsMessage
                });
                failedToast.fire();
            }
        });

        $A.enqueueAction(action);
    }
})