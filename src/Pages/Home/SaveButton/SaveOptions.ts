export type ImgFormat = 'image/png' | 'image/jpeg';

interface ISaveOptions {
  pixelRatio?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  quality?: number;
  cacheBust?: boolean;
  includeQueryParams?: boolean;
  imagePlaceholder?: string;
  skipAutoScale?: boolean;
  type?: ImgFormat;
}

export class SaveOptions {
  saveOptions: ISaveOptions = {
    pixelRatio: 1,
  };
  
  constructor(defaultOptions?: ISaveOptions) {
    if (defaultOptions) {
      this.saveOptions = {
        ...defaultOptions
      };
    }
  }

  public pixelRatio(pixelRatio: number): SaveOptions {
    this.saveOptions.pixelRatio = pixelRatio;
    return this;
  }

  public canvasWidth(canvasWidth: number): SaveOptions {
    this.saveOptions.canvasWidth = canvasWidth;
    return this;
  }

  public canvasHeight(canvasHeight: number): SaveOptions {
    this.saveOptions.canvasHeight = canvasHeight;
    return this;
  }

  public quality(quality: number): SaveOptions {
    this.saveOptions.quality = quality;
    return this;
  }

  public cacheBust(cacheBust: boolean): SaveOptions {
    this.saveOptions.cacheBust = cacheBust;
    return this;
  }

  public includeQueryParams(includeQueryParams: boolean): SaveOptions {
    this.saveOptions.includeQueryParams = includeQueryParams;
    return this;
  }

  public imagePlaceholder(imagePlaceholder: string): SaveOptions {
    this.saveOptions.imagePlaceholder = imagePlaceholder;
    return this;
  }

  public skipAutoScale(skipAutoScale: boolean): SaveOptions {
    this.saveOptions.skipAutoScale = skipAutoScale;
    return this;
  }

  public type(imgFormat: ImgFormat): SaveOptions {
    this.saveOptions.type = imgFormat;
    return this;
  }

  public build(): ISaveOptions {
    return this.saveOptions;
  }
}
