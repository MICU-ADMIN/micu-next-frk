"use client";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SnowTheme } from "quill-color-picker-enhance";
import ImageResize from "quill-image-resize-module-react";
import EditorEditOptions from "./EditorEditOptions";

Quill.register("themes/snow-quill-color-picker-enhance", SnowTheme);
Quill.register("modules/imageResize", ImageResize);
const fontSizeArr = [
  "calc(0.75em + 0.1vw)",
  "calc(0.875em + 0.1vw)",
  "calc(1em + 0.1vw)",
  "calc(1.125em + 0.1vw)",
  "calc(1.25em + 0.1vw)",
  "calc(1.375em + 0.1vw)",
  "calc(1.5em + 0.1vw)",
  "calc(1.75em + 0.1vw)",
  "calc(2em + 0.1vw)",
  "calc(2.25em + 0.1vw)",
  "calc(2.5em + 0.1vw)",
  "calc(2.75em + 0.1vw)",
  "calc(3em + 0.1vw)",
  "calc(3.25em + 0.1vw)",
  "calc(3.5em + 0.1vw)",
  "calc(3.75em + 0.1vw)",
  "calc(4em + 0.1vw)",
  "calc(4.25em + 0.1vw)",
  "calc(4.5em + 0.1vw)",
  "calc(4.75em + 0.1vw)",
  "calc(5em + 0.1vw)",
  "calc(5.25em + 0.1vw)",
  "calc(5.5em + 0.1vw)",
  "calc(5.75em + 0.1vw)",
  "calc(6em + 0.1vw)",
  "calc(6.25em + 0.1vw)",
  "calc(6.5em + 0.1vw)",
  "calc(6.75em + 0.1vw)",
  "calc(7em + 0.1vw)",
  "calc(7.25em + 0.1vw)",
  "calc(7.5em + 0.1vw)",
  "calc(7.75em + 0.1vw)",
  "calc(8em + 0.1vw)",
];
var Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
  "script",
  "code-block",
];

import React from "react";

function Editor({
  toggleHtml,
  title,
  value,
  element,
  theme,
  readOnly,
  styles = {},
  setTransform,
  fonts,
  targetRef,
  showEditMenu,
  colors,
  defaultColor,
  placeholder,
  setShowEditMenu,
  onChange,
  onChangeData,
  disableFocus = false,
  className = "",
}) {
  const reactQuillRef = React.useRef(null);

  function handleChange(html, delta, source, editor) {
    if (html.length > 3000) return alert("Max length is 3000 characters");

    onChange(html);
  }

  React.useEffect(() => {
    attachQuillRefs();
  }, []);

  function attachQuillRefs() {
    // Ensure React-Quill reference is available:
    if (typeof reactQuillRef?.current?.getEditor !== "function") return;
    // Skip if Quill reference is defined:
    // if (this.quillRef != null) return;

    const quillRef = reactQuillRef?.current.getEditor();
    // if (quillRef != null) this.quillRef = quillRef;
  }

  function showColorPicker(value) {
    if (value === "custom-color") {
      var picker = document.getElementById("custom-color");
      if (!picker) {
        div = document.createElement("div");
        div.style.position = "fixed";
        div.style.zIndex = "10000";
        div.style.top = "50vh";
        div.style.backgroundColor = "white";
        div.style.left = "50vw";

        picker = document.createElement("input");
        picker.id = "custom-color";
        picker.type = "color";
        picker.style.position = "fixed";
        picker.style.zIndex = "10000";
        picker.style.top = "50vh";
        picker.style.left = "50vw";
        picker.value = "#FF0000";
        div.appendChild(picker);

        document.body.appendChild(div);

        picker.addEventListener(
          "change",
          function () {
            this.quill.format("color", picker.value);
          },
          false
        );
      }
      // setTimeout(() => {
      //   picker.click();
      // }, 100);
    } else {
      this.quill.format("color", value);
    }
  }
  //hack to add hover effect to element with inline style tag
  return (
    <>
      <style>
        {!element
          ? ""
          : `
    #editor${element.id} {
      background: ${
        element.data?.isGradient
          ? `linear-gradient(${element.data?.gradientDeg}deg, ${element.data?.gradientLeft}, ${element.data?.gradientRight})`
          : element.data?.color || "inherit"
      };
      color: ${defaultColor || "black"};
      border-radius: ${element.data?.borderRadius ? element.data?.borderRadius + "px" : "0px"};
      height: fit-content;
      padding: ${element?.data?.padding ? element?.data?.padding + "px" : "10px"};
      margin: ${element?.data?.margin ? element?.data?.margin + "px" : "0px"};
      cursor: ${element.data?.showCursor ? "pointer" : "default"};
      text-align: ${element.data?.textAlign || "left"};
    }

    #editor${element.id}:hover {
      ${
        element.data?.hoverColor || element.data?.hoverIsGradient
          ? `background: ${
              element.data?.hoverIsGradient
                ? `linear-gradient(${element.data?.hoverGradientDeg}deg, ${element.data?.hoverGradientLeft}, ${element.data?.hoverGradientRight})`
                : element.data?.hoverColor
            };`
          : ""
      }
      ${element.data?.hoverTextColor ? `color: ${element.data?.hoverTextColor};` : ""}
      ${element.data?.hoverBorderRadius ? `border-radius: ${element.data?.hoverBorderRadius}px";` : ""}
      ${element.data?.hoverPadding ? `padding: ${element.data?.hoverPadding}px;` : ""}
      ${element.data?.hoverMargin ? `margin: ${element.data?.hoverMargin}px";` : ""}
      }`}
      </style>

      <div style={styles || {}} data={element?.data?.color ? "background" : ""} id={`editor${element?.id}`} className={`text-wrapper   ${className}`}>
        {toggleHtml || readOnly ? (
          <div className="h-fit align-center" dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <>
            <ReactQuill
              theme={theme || "snow-quill-color-picker-enhance"}
              onChange={handleChange}
              toolbar={{
                ...Editor.modules.toolbar,
              }}
              preserveWhitespace={true}
              defaultColor={defaultColor || "black"}
              value={value}
              style={{ textAlign: element?.data?.textAlign || "left" }}
              formats={formats}
              ref={(el) => {
                if (!disableFocus && el) {
                  reactQuillRef.current = el;
                  el.focus();
                }
              }}
              modules={{
                toolbar: {
                  container: [
                    [{ font: fonts || [] }],
                    [{ size: fontSizeArr }],
                    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [
                      {
                        color: colors ? ["", ...colors, "custom-picker"] : [],
                      },
                      { background: [] },
                    ],
                    [{ script: "sub" }, { script: "super" }],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ align: [] }],

                    ["link", "video"],
                    ["clean"],
                  ],
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              bounds={".app"}
              placeholder={placeholder}
            />
          </>
        )}
      </div>

      {showEditMenu && (
        <EditorEditOptions
          element={element}
          onChange={onChange}
          setShowEditMenu={setShowEditMenu}
          targetRef={targetRef}
          setTransform={setTransform}
          onChangeData={onChangeData}
          colors={colors}
        />
      )}
    </>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],

    ["bold", "italic", "underline", "strike"],
    [
      // { list: 'ordered' },
      // { list: 'bullet' },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];

export default Editor;
