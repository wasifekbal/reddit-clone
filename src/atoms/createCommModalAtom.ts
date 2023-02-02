import { atom } from "recoil"

export interface CreateCommModalState {
    open: boolean,
}

const defaultModalState: CreateCommModalState = {
    open: false,
}

export const createCommModalState = atom<CreateCommModalState>({
    key: 'createCommModalState',
    default: defaultModalState,
})
