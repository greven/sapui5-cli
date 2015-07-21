sap.ui.controller("my.app.view.App", {
    
	onInit: function() {
		if (sap.ui.Device.system.desktop) {
			this.getView().addStyleClass("sapUiSizeCompact");
		}
	}
});
