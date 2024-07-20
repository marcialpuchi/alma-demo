import { create } from 'zustand'

export type Lead = {
  name: string,
  email: string
  status: string,
  submitted: string,
}

interface State {
  leads: Lead[],
  updateLeads: (leads: Lead[]) => void
};


export const useStore = create<State>()((set) => ({
  leads: [],
  updateLeads: (data: Lead[]) => set({leads: data})
}))
