"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  RotateCcw,
  RotateCw,
  MoreVertical,
} from "lucide-react";

export function TextFormatter({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const [fontFamily, setFontFamily] = useState("Sans Serif");
  const [fontSize, setFontSize] = useState("16");

  // ✅ Set initial HTML only once (prevents disappearing/ jumping issue)
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const executeCommand = (command, commandValue) => {
    document.execCommand(command, false, commandValue);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleUndo = () => executeCommand("undo");
  const handleRedo = () => executeCommand("redo");

  const handleFontChange = (f) => {
    setFontFamily(f);
    executeCommand("fontName", f);
  };

  const handleFontSizeChange = (s) => {
    setFontSize(s);
    executeCommand("fontSize", s);
  };

  return (
    <div className="space-y-0 border border-gray-300 rounded-lg overflow-hidden">
      {/* ✅ editable area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        placeholder={placeholder}
        className="min-h-[120px] p-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      />

      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-100 border-t border-gray-300 text-gray-900">
        <Button size="sm" variant="ghost" onClick={handleUndo}><RotateCcw className="h-4 w-4"/></Button>
        <Button size="sm" variant="ghost" onClick={handleRedo}><RotateCw className="h-4 w-4"/></Button>

        <div className="w-px h-6 bg-gray-300" />

        <select
          value={fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
          className="h-8 px-2 text-sm border rounded bg-white"
        >
          <option>Sans Serif</option>
          <option>Serif</option>
          <option>Monospace</option>
          <option>Georgia</option>
          <option>Courier New</option>
        </select>

        <select
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          className="h-8 px-2 text-sm border rounded bg-white"
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="24">24</option>
          <option value="28">28</option>
          <option value="32">32</option>
        </select>

        <div className="w-px h-6 bg-gray-300" />

        <Button size="sm" variant="ghost" onClick={() => executeCommand("bold")} className="font-bold">B</Button>
        <Button size="sm" variant="ghost" onClick={() => executeCommand("italic")} className="italic">I</Button>
        <Button size="sm" variant="ghost" onClick={() => executeCommand("underline")} className="underline">U</Button>

        <input
          type="color"
          onChange={(e) => executeCommand("foreColor", e.target.value)}
          className="h-8 w-8 cursor-pointer border rounded"
        />

        <div className="w-px h-6 bg-gray-300" />

        <Button size="sm" variant="ghost" onClick={() => executeCommand("justifyLeft")}><AlignLeft className="h-4 w-4" /></Button>
        <Button size="sm" variant="ghost" onClick={() => executeCommand("justifyCenter")}><AlignCenter className="h-4 w-4" /></Button>
        <Button size="sm" variant="ghost" onClick={() => executeCommand("justifyRight")}><AlignRight className="h-4 w-4" /></Button>
        <Button size="sm" variant="ghost" onClick={() => executeCommand("justifyFull")}><AlignJustify className="h-4 w-4" /></Button>

        <div className="w-px h-6 bg-gray-300" />

        <Button size="sm" variant="ghost" onClick={() => executeCommand("insertUnorderedList")}><List className="h-4 w-4" /></Button>
        <Button size="sm" variant="ghost" onClick={() => executeCommand("insertOrderedList")}><ListOrdered className="h-4 w-4" /></Button>

        <div className="w-px h-6 bg-gray-300" />

        <Button size="sm" variant="ghost"><MoreVertical className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
