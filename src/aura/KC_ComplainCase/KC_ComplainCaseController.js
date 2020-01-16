
({
    cancelCase: function (component, event, helper) {
        helper.cancelCase(component);

    },
    createCase: function (component, event, helper) {
        helper.createCase(component);
        helper.cancelCase(component);

    }
})