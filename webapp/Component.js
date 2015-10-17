sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/Device",
	"./model/models"
], function(UIComponent, ResourceModel, ODataModel, Device, models) {
	"use strict";

	UIComponent.extend("my.app.Component", {
		metadata: {
			name: "My SAPUI5 Demo App",
			version: "0.1",
			includes: [ "css/styles.min.css" ],
			dependencies: {
				libs: [ "sap.m", "sap.ui.layout" ],
				components: []
			},

			rootView: "my.app.view.App",

			config: {
				resourceBundle: "i18n/i18n.properties",
				titleResource: "xtit.shellTitle",
				// icon: "sap-icon://Fiori7/F1373",
				// favIcon: "icon/icon.ico",
				serviceConfig: {
					name: "ServiceName",
					serviceUrl: ""
				}
			},

			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewType: "XML",
					viewPath: "my.app.view",
					targetAggregation: "pages",
					targetControl: "AppContainer",
					transition: "slide",
					clearTarget: false
				},
				routes: [
					{
						pattern: "",
						name: "Main",
						view: "Main"
					}
        ]
			}
		},

		init: function() {
			var mConfig = this.getMetadata().getConfig();
			var sRootPath = jQuery.sap.getModulePath("my.app");
			// Set the device model
			this.setModel(models.createDeviceModel(), "device");
			// Set the FLP model
			this.setModel(models.createFLPModel(), "FLP");

			// Create and set the ODataModel
			var oAppModel = models.createODataModel({
				urlParametersForEveryRequest: [
          "sap-server",
          "sap-client",
          "sap-language"
        ],
				url: mConfig.serviceConfig.serviceUrl,
				config: {
					metadataUrlParams: {
						"sap-documentation": "heading"
					},
					json: true,
					defaultBindingMode: "OneWay",
					useBatch: true,
					defaultCountMode: "Inline",
					loadMetadataAsync: true
				}
			});

			this.setModel(oAppModel);

			// Set i18n model
			this.setModel(models.createResourceModel(sRootPath, mConfig.resourceBundle), "i18n");

			// Call the base component"s init function
			UIComponent.prototype.init.apply(this, arguments);
			// Create the views based on the url/hash
			this.getRouter().initialize();
		},

		destroy: function() {
			this.getModel().destroy();
			this.getModel("i18n").destroy();
			this.getModel("FLP").destroy();
			this.getModel("device").destroy();

			// Call the base component"s destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		}

	});
});
