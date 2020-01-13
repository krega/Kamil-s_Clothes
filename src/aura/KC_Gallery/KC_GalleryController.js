({
    setFeaturedPhoto : function (component, event,helper) {
        let clickedPhoto = event.currentTarget.dataset.url;
        component.set("v.featurePhoto",clickedPhoto);
        console.log()
    }
});