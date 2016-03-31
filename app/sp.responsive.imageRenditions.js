/// <reference path="typings/jquery.d.ts"/>
/// <reference path="typings/modernizr.d.ts"/>
var SPResponsiveImageRenditions;
(function (SPResponsiveImageRenditions) {
    var RenditionSetting = (function () {
        function RenditionSetting(id, name, mediaQuery) {
            this.id = id;
            this.name = name;
            this.mediaQuery = mediaQuery;
        }
        return RenditionSetting;
    }());
    SPResponsiveImageRenditions.RenditionSetting = RenditionSetting;
    var ModuleConfig = (function () {
        function ModuleConfig(renditionIds, wrapperSelectors) {
            this.renditionIds = renditionIds;
            this.wrapperSelectors = wrapperSelectors;
        }
        return ModuleConfig;
    }());
    SPResponsiveImageRenditions.ModuleConfig = ModuleConfig;
    var RenditionsModule = (function () {
        function RenditionsModule(renditionModuleConfig) {
            var _this = this;
            this.removeParams = function (image) {
                var parts = image.split('?');
                return parts[0];
            };
            this.getRenditionQuery = function (renditionOpts) {
                var renditionId = 0;
                $.each(renditionOpts, function (key, rendition) {
                    if (Modernizr.mq(rendition.mediaQuery)) {
                        renditionId = rendition.id;
                    }
                });
                var append = '';
                if (renditionId !== 0) {
                    append = '?RenditionID=' + renditionId;
                }
                return append;
            };
            this.applyRenditionIds = function (selector, renditionOpts) {
                var module = _this;
                var element = $(selector);
                element.find('img').each(function (elemIndex, elemImg) {
                    var imageElement = $(elemImg);
                    var imageSource = imageElement.attr('src');
                    imageSource = module.removeParams(imageSource);
                    imageSource = imageSource + module.getRenditionQuery(renditionOpts);
                    imageElement.attr('src', imageSource);
                    imageElement.attr('style', '');
                });
            };
            this.init = function () {
                try {
                    var module = _this;
                    $.each(module.config.wrapperSelectors, function (key, data) {
                        this.applyRenditionIds(data, module.config.renditionIds);
                    });
                }
                catch (e) {
                    console.error(e.stack);
                }
            };
            this.config = renditionModuleConfig;
        }
        return RenditionsModule;
    }());
    SPResponsiveImageRenditions.RenditionsModule = RenditionsModule;
    $(function () {
        var tabletRendition = new RenditionSetting(5, 'tablet', 'screen and (min-width: 768px) and (max-width: 1199px)');
        var mobileRendition = new RenditionSetting(6, 'mobile', 'screen and (max-width: 480px)');
        var mobileLargeRendition = new RenditionSetting(7, 'mobile large', 'screen and (min-width: 481px) and (max-width: 767px)');
        var renditionOpts = [tabletRendition, mobileRendition, mobileLargeRendition];
        var selectors = ['.vs-content-page'];
        var config = new ModuleConfig(renditionOpts, selectors);
        new RenditionsModule(config).init();
    });
})(SPResponsiveImageRenditions || (SPResponsiveImageRenditions = {}));
//# sourceMappingURL=sp.responsive.imageRenditions.js.map