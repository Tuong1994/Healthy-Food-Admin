import { create, StateCreator } from "zustand";
import { linkPaths } from "@/common/constant/url";

const { DASHBOARD } = linkPaths;

interface PathnameState {
  previousPath: string;
  setPreviousPath: (path: string) => void;
}

const store: StateCreator<PathnameState> = (set) => ({
  previousPath: DASHBOARD,
  setPreviousPath: (path) => set((state) => ({ ...state, previousPath: path })),
});

const usePathnameStore = create(store);

export default usePathnameStore;
