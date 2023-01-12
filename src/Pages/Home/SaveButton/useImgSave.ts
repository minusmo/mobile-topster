import { useRef } from "react";
import { toBlob } from "html-to-image";
import saveAs from "file-saver";
import { SaveOptions } from "./SaveOptions";

type BrowserType = 'safari' | 'chrome' | 'firefox';
const DEFAULT_ERROR_MESSAGE = "저장에 실패했습니다.\n기기의 사양 혹은 브라우저 환경 문제일 수 있습니다.";

function useImgSave(capturedNode: HTMLElement | null) {
      const capturedNodeRef = useRef(capturedNode);
      const userAgent = window.navigator.userAgent!;

      return {
        updateCapturedArea(capturedArea: HTMLElement) {
          capturedNodeRef.current = capturedArea;
        },
        async captureArea(imgType: string = 'jpeg'): Promise<void> {    
          const options = new SaveOptions().build();
      
          try {
            if (capturedNodeRef.current == null) throw Error('No HTML Node reference');
            const blob: Blob | null = await toBlob(capturedNodeRef.current, options);
            if (blob) {
              saveAs(blob, `topsters.${imgType}`);
            }
          } catch (error) {
            alert(DEFAULT_ERROR_MESSAGE);
            console.warn(error);
          }
        }
      }    
}

export default useImgSave;