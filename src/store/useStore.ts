import { create } from 'zustand'

export type Lead = {
  id: string,
  name: string,
  email: string
  status: 'PENDING' | 'REACHED_OUT',
  submitted: string,
  isUpdating?: boolean
}

interface State {
  leads: Lead[],
  updateLeads: (leads: Lead[]) => void
  toggleLeadUpdatingState: (id: string) => void
};


export const useStore = create<State>()((set) => ({
  leads: [],
  updateLeads: (data: Lead[]) => set({leads: data}),
  toggleLeadUpdatingState: (id: string) => set((state) => ({...state, leads: state.leads.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        isUpdating: !lead.isUpdating
      }
    }
    return lead
  })}))
}))
