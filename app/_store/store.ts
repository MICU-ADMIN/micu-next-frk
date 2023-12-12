import { create } from "zustand";

let articleStore = (set: () => any) => ({
  audioUrl: "", //@ts-expect-error
  setAudioUrl: (url: string) => set(() => ({ audioUrl: url })),
});

// formStore = devtools(taskStore);

//@ts-expect-error
export const useArticleStore = create(articleStore);

let modalStore = (set: () => any) => ({
  modalState: false, //@ts-expect-error
  setModalState: (state: boolean) => set(() => ({ modalState: state })),
});

// formStore = devtools(taskStore);

//@ts-expect-error
export const useModalStore = create(modalStore);
