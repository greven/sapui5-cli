jQuery.sap.declare("my.app.Component");

sap.ui.core.UIComponent.extend("my.app.Component", {

    metadata : {
        name : "My SAPUI5 Demo App",
        version : "0.1",
        includes : ["css/styles.css"],
        dependencies : {
            libs : ["sap.m", "sap.ui.layout"],
            components : []
        },

        rootView : "my.app.view.App",

        config : {
            resourceBundle : "i18n/messageBundle.properties",
            // serviceConfig : {
            //     name : "",
            //     serviceUrl : ""
            //     }
        },

        routing: {
        	config: {
        		viewType : "XML",
        		viewPath: "my.app.view",
        		targetAggregation: "pages",
        		targetControl: "AppContainer",
        		transition: "slide",
        		clearTarget: false,
        	},
        	routes: [
                {
            		pattern: "",
            		name : "Main",
            		view : "Main",
        		 },
        	]
        },
    },

    init : function() {
        jQuery.sap.require("sap.ui.core.routing.History");
        jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

        sap.ui.core.UIComponent.prototype.init.apply(this);

        var mConfig = this.getMetadata().getConfig();
        var rootPath = jQuery.sap.getModulePath("my.app");

        // Set i18n model
        // var i18nModel = new sap.ui.model.resource.ResourceModel({
        //     bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
        // });
        // this.setModel(i18nModel, "i18n");

        // Create and set domain model to the component
        // var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        // var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        // this.setModel(oModel);

        var router = this.getRouter();
        this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
        router.initialize();
    }
});
