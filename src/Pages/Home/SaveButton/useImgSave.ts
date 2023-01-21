import { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { SaveOptions } from "./SaveOptions";

type BrowserType = 'safari' | 'chrome' | 'firefox';
const DEFAULT_ERROR_MESSAGE = "저장에 실패했습니다.\n기기의 사양 혹은 브라우저 환경 문제일 수 있습니다.";

function useImgSave(capturedNode: HTMLElement | null) {
  const [isRendering, setIsRendering] = useState(false);
  const capturedNodeRef = useRef(capturedNode);
  const userAgent = window.navigator.userAgent!;
  const options = new SaveOptions().pixelRatio(1.0).quality(1.0).build();
  return {
    isRendering,
    updateCapturedArea(capturedArea: HTMLElement) {
      capturedNodeRef.current = capturedArea;
    },
    async captureArea(imgType: string = 'jpeg'): Promise<void> {    
      setIsRendering(prevState => true);
      try {
        if (capturedNodeRef.current == null) throw Error('No HTML Node reference');
        hideCells();
        const isProcessed = await processCompletely(capturedNodeRef.current, toJpeg);
        if (isProcessed) {
          const jpegImg = await toJpeg(capturedNodeRef.current, options);
          const link = document.createElement('a');
          link.download = 'yourtopster.jpeg';
          link.href = jpegImg;
          link.click();
        }
      } catch (error) {
        alert(DEFAULT_ERROR_MESSAGE);
        console.warn(error);
      }
      finally {
        displayCells();
        setIsRendering(prevState => false);
      }
    }
  }    
}

function hideCells() {
  const emptyCells = Array
  .from(document.getElementsByClassName('cell'))
  .filter((cell) => {
    const imgCell = cell as HTMLImageElement;
    return imgCell.alt === '';
  })
  .forEach((cell) => {
    const imgCell = cell as HTMLImageElement;
    imgCell.style.position = 'relative';
    imgCell.style.zIndex = '-3';
  });
}

function displayCells() {
  const cells = Array.from(document.getElementsByClassName('cell'));
  cells.forEach((cell) => {
    const imgCell = cell as HTMLImageElement;
    imgCell.style.position = 'static';
    imgCell.style.zIndex = '0';
  });
}

async function processCompletely(rootElement: HTMLElement, processToBeDone: (element: HTMLElement) => Promise<any>, isExceptedElement?: (element: HTMLElement) => boolean): Promise<boolean> {
  const elementsToBeProcessed = [];
  elementsToBeProcessed.push(rootElement);
  while (elementsToBeProcessed.length != 0 ) {
    const currentElement = elementsToBeProcessed.shift() as HTMLElement;
    try {
      if (isExceptedElement && isExceptedElement(currentElement) === false) await processToBeDone(currentElement);
    }
    catch(error) {
      console.warn(`${error} is raised at ${currentElement} while processing.`);
    }
    elementsToBeProcessed.push(...Array.from(currentElement.children));
  }
  return true;
}

export default useImgSave;