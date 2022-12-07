import { makeAutoObservable } from "mobx";

type FontStyleProps = {
  fontFamily: string;
  fontSize: string;
  textColor: string;
};
export class FontStyle {
  fontFamily: string;
  fontSize: string;
  textColor: string;
  constructor(fontFamily: string = "default", fontSize: string = "10px", textColor: string = "#fff") {
    makeAutoObservable(this);
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.textColor = textColor;
  }

  // get fontFamily(): string { return this.#fontFamily; }
  // set fontFamily(fontFamily: string) { this.#fontFamily = fontFamily; }
  // get fontSize(): string { return this.#fontSize; }
  // set fontSize(fontSize: string) { this.#fontSize = fontSize; }
  // get textColor(): string { return this.#textColor; }
  // set textColor(textColor: string) { this.#textColor = textColor; }
  copyFrom(fontStyleProps: FontStyleProps): void {
    this.fontFamily = fontStyleProps.fontFamily;
    this.fontSize = fontStyleProps.fontSize;
    this.textColor = fontStyleProps.textColor;
  }

  toString(): string {
    return JSON.stringify({
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      textColor: this.textColor
    });
  }
}
