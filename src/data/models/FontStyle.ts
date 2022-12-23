import { makeAutoObservable } from "mobx";

type IFontStyle = {
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

  fromJson(fontStyleObject: IFontStyle): void {
    this.fontFamily = fontStyleObject.fontFamily;
    this.fontSize = fontStyleObject.fontSize;
    this.textColor = fontStyleObject.textColor;
  }

  toString(): string {
    return JSON.stringify({
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      textColor: this.textColor
    });
  }
}
