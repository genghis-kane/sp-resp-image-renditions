/// <reference path="../typings/jquery.d.ts"/>
/// <reference path="../typings/modernizr.d.ts"/>


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
                var element = $(selector);

                element.find('img').each(function (elemIndex, elemImg) {
                    var imageElement = $(elemImg);
                    var imageSource = imageElement.attr('src');
                    imageSource = this.removeParams(imageSource);
                    imageSource = imageSource + this.getRenditionQuery(renditionOpts);
                    imageElement.attr('src', imageSource);
                    imageElement.attr('style', '');
                });
            }
            
            init = () => {
                try {
                    $.each(this.generalContentSelectors, function (key, data) {
            applyRenditionIds(data, generalContentRenditions);
        });
                }
                catch (e) {
                    console.error(e.stack);
                }
            }              
    }
}

