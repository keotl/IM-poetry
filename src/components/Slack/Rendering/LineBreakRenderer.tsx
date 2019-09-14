import React from "react";
import { AbstractRichTextRenderer } from "./RichTextRenderer";

export class LineBreakRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/\n/);
  }

  render(): JSX.Element {
    return <br />;
  }
}
