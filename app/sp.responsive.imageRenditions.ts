/// <reference path="typings/jquery.d.ts"/>
/// <reference path="typings/modernizr.d.ts"/>

module SPResponsiveImageRenditions {
    export class RenditionSetting {
        public id: number;
        public name: string;
        public mediaQuery: string;

        constructor(id: number, name: string, mediaQuery: string) {
            this.id = id;
            this.name = name;
            this.mediaQuery = mediaQuery;
        }
    }
    
    export class ModuleConfig {
        public renditionIds: RenditionSetting[];
        public wrapperSelectors: string[];
        
        constructor(renditionIds: RenditionSetting[], wrapperSelectors: string[]) {
            this.renditionIds = renditionIds;
            this.wrapperSelectors = wrapperSelectors;
        }
    }

    export class RenditionsModule {
        public config: ModuleConfig;
        
            constructor(renditionModuleConfig: ModuleConfig) {
                this.config = renditionModuleConfig;
            } 
            
            removeParams = (image: any) => {
                var parts = image.split('?');
                return parts[0];
            }
            
            getRenditionQuery = (renditionOpts: RenditionSetting[]) => {
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
            }
            
            applyRenditionIds = (selector: string, renditionOpts: RenditionSetting[]) => {
                var module = this;
                var element = $(selector);

                element.find('img').each(function (elemIndex, elemImg) {
                    var imageElement = $(elemImg);
                    var imageSource = imageElement.attr('src');
                    imageSource = module.removeParams(imageSource);
                    imageSource = imageSource + module.getRenditionQuery(renditionOpts);
                    imageElement.attr('src', imageSource);
                    imageElement.attr('style', '');
                });
            }
            
            init = () => {
                try {
                    var module = this;
                    $.each(module.config.wrapperSelectors, function (key, data) {
                        this.applyRenditionIds(data, module.config.renditionIds);
                    });
                }
                catch (e) {
                    console.error(e.stack);
                }
            }              
    }
    
    $(function() {
        
        var tabletRendition = new RenditionSetting(5, 'tablet', 'screen and (min-width: 768px) and (max-width: 1199px)');
        var mobileRendition = new RenditionSetting(6, 'mobile', 'screen and (max-width: 480px)');
        var mobileLargeRendition = new RenditionSetting(7, 'mobile large', 'screen and (min-width: 481px) and (max-width: 767px)');
    
        var renditionOpts = [tabletRendition, mobileRendition, mobileLargeRendition];   
        var selectors = ['.vs-content-page'];
    
        var config = new ModuleConfig(renditionOpts, selectors);
    
	   new RenditionsModule(config).init();
 });
}

