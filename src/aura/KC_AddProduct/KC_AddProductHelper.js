({
    getSizeOption: function(component) {
        let sizeOptions = [];
        let action = component.get("c.getSizeOption");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                sizeOptions = response.getReturnValue();
                console.log(sizeOptions);
                component.set("v.sizeOptions", sizeOptions);
           }
        });
     $A.enqueueAction(action);
    },
    setUserId: function(component) {
        let userId = $A.get("$SObjectType.CurrentUser.Id");
        component.set("v.userId", userId);
    },
    getFamilyOption: function(component) {
        let familyOptions = [];
        let getFamily = component.get("c.getFamilyOption");
        getFamily.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                familyOptions = response.getReturnValue();
                component.set("v.familyOptions", familyOptions);
            }
        });
        $A.enqueueAction(getFamily);
    },

    handleSize: function(component, event) {
        console.log('previous' + component.get("v.selectedSizes"));
        let selectedSizes = component.get("v.selectedSizes");
        let sizes = event.getSource().get("v.value");
        console.log('sizes' + sizes);
        if (event.getSource().get("v.checked")) {
            selectedSizes = sizes;
        }
        component.set("v.selectedSizes", selectedSizes);
    },
    familyChange: function(component, event) {
        console.log('previous' + component.get("v.selectedFamily"));
        let selectedFamily = component.get("v.selectedFamily");
        let family = event.getSource().get("v.value");
        if (event.getSource().get("v.checked")) {
            selectedFamily = family;
        }
        component.set("v.selectedFamily", selectedFamily);
    },
    getPhotos: function(component, event) {
        let files = event.getParam("files");
        console.log('files' + files);
        let fileIds = [];
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            let fileName = files[i].name.split(".");
            if (fileName[fileName.length - 1] != 'jpg' && fileName[fileName.length - 1] != 'jpeg' && fileName[fileName.length - 1] != 'png') {
                component.find("toastCmp").toast($A.get("$Label.c.KC_Error"), "error", $A.get("$Label.c.KC_FileTypeNotSupported"));
            } else {
                fileIds.push(files[i].documentId);
            }
        }
        component.set("v.fileIds", fileIds);
    },
    saveNewProduct: function(component) {
        let productName = component.get("v.productName"),
            producerName = component.get("v.producerName"),
            productCode = component.get("v.productCode"),
            standardPrice = component.get("v.standardPrice"),
            availableSizes = component.get("v.selectedSizes"),
            availableFamily = component.get("v.selectedFamily"),
            description = component.get("v.description"),
            fileIds = component.get("v.fileIds");
        let action = component.get("c.createProduct");
        action.setParams({
            productName: productName,
            producerName: producerName,
            productCode: productCode,
            standardPrice: standardPrice,
            availableSizes: availableSizes,
            family: availableFamily,
            description: description,
            fileIds: fileIds
        })
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                window.location.replace("https://krega-dev-ed.lightning.force.com/lightning/r/Product2/" + response.getReturnValue() + "/view");
            }
        });
        $A.enqueueAction(action);
    }
})