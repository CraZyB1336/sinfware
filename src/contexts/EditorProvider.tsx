"use client";

import { createContext, ReactNode, useContext, useMemo, useSyncExternalStore } from "react";
import { createEditor, Editor } from "@/editor/editor";
import { EditorState } from "@/editor/state";

export type EditorStore = {
  attach: (canvas: HTMLCanvasElement) => () => void;
  getEditor: () => Editor | null;
  subscribe: (listener: () => void) => () => void;
};

const EditorContext = createContext<EditorStore | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const store = useMemo<EditorStore>(() => {
    let editor: Editor | null = null;
    const listeners = new Set<() => void>();
    const notify = () => listeners.forEach((listener) => listener());

    return {
      getEditor: () => editor,
      subscribe: (listener) => {
        listeners.add(listener);
        return () => {
          listeners.delete(listener);
        };
      },
      attach: (canvas) => {
        const instance = createEditor(canvas);
        const unsubscribe = instance.subscribe(notify);
        editor = instance;
        notify();

        return () => {
          unsubscribe();
          instance.destroy();
          if (editor === instance) editor = null;
          notify();
        };
      },
    };
  }, []);

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
}

export function useEditorStore(): EditorStore {
  const store = useContext(EditorContext);
  if (!store) throw new Error("useEditorStore must be used inside <EditorProvider>");
  return store;
}

/**
 * Hook for retrieving the editor instance. 
 * The editor instance will mainly be used by GUI commands such as zooming and panning.
 * @returns The editor instance. Null if no instance.
 */
export function useEditor(): Editor | null {
  const { subscribe, getEditor } = useEditorStore();
  return useSyncExternalStore(subscribe, getEditor, () => null);
}

/**
 * Hook for retrieving a specific editor state value.
 * @param selector Which value or attribute to target.
 * @param fallback Fallback value
 * @returns The editor value. Fallback if there are no editor instance.
 */
export function useEditorValue<T>(selector: (state: EditorState) => T, fallback: T): T {
  const { subscribe, getEditor } = useEditorStore();
  const getSnapshot = () => {
    const editor = getEditor();
    return editor ? selector(editor.state) : fallback;
  };
  return useSyncExternalStore(subscribe, getSnapshot, () => fallback);
}
