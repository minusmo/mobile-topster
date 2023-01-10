type Browser = 'safari' | 'chrome' | 'firefox';

interface ISaveOptions {
    pixelRatio?: number;
    canvasWidth?: number;
    canvasHeight?: number;
    quality?: number;
    cacheBust?: boolean;
    includeQueryParams?: boolean;
    imagePlaceholder?: string;
    
}

const createSaveOptions = (
  screenshotArea: HTMLElement | null
): ISaveOptions => {
  if (!screenshotArea) {
    return {};
  }
  let options = {
    pixelRatio: 1,
  };
  return options;
};

function useImgSave() {
      const handleSave = async (imgType: string = 'jpeg'): Promise<void> => {
        const userAgent = window.navigator.userAgent!;
        if (!screenshotArea.current) {
          return;
        }
    
        const options = createSaveOptions(screenshotArea.current);
        const browser = window.navigator.userAgent;
    
        try {
          const blob: Blob | null = await htmlToImage.toBlob(
            screenshotArea.current,
            options
          );
          if (blob) {
            saveAs(blob, `topster-mobile.${imgType}`);
          }
        } catch (error) {
          alert("저장에 실패했습니다.");
          console.warn(error);
        } finally {
        }
      };    
}

export default useImgSave;