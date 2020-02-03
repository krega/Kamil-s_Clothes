({
    cancelCase: function(component) {
        component.set('v.caseSubject', '');
        component.set('v.caseDescription', '');
        component.set('v.showForm', false);
    },
    createCase: function(component) {
        let orderId = component.get('v.orderId');
        let caseSubject = component.get('v.caseSubject');
        let caseDescription = component.get('v.caseDescription');


        let action = component.get('c.createNewCase');
        action.setParams({
            orderId: orderId,
            caseSubject: caseSubject,
            caseDescription: caseDescription
        });
        $A.enqueueAction(action);
    }
})