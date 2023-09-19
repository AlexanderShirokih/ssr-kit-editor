import { GenericComponent } from "../core/Components";

export type BackStackChangeCallback = (entry: BackStackChangeEntry) => void;

export interface ScreenStackType {
  backstack: string[];
  backStackChangeCallbacks: BackStackChangeCallback[];
}

export interface BackStackChangeEntry {
    prevTag: string,
    prevScreen?: GenericComponent,
    currentTag: string,
    currentScreen?: GenericComponent,
}
