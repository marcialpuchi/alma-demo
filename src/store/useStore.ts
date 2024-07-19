import { create } from 'zustand'

type Lead = {
  name: string,
  submitted: Date,
  status: string,
  country: string
}

interface State {
  leads: Lead[]
};


export const useStore = create<State>()((set) => ({
  leads: [
    {name:"Jorge Ruiz", submitted: new Date("1/1/2024"), status: "Pending", country: "Mexico"},
    {name:"Bahar Zamir", submitted: new Date("1/1/2024"), status: "Pending", country: "Mexico"},
    {name:"Mary Lopez", submitted: new Date("1/1/2024"), status: "Pending", country: "Brazil"},
    {name:"L Zijin", submitted: new Date("1/1/2024"), status: "Pending", country: "South Korea"},
    {name:"Mark Antonov", submitted: new Date("1/1/2024"), status: "Pending", country: "Russia"},
    {name:"Jane Ma", submitted: new Date("1/1/2024"), status: "Pending", country: "Mexico"},
    {name:"Anand Jain", submitted: new Date("1/1/2024"), status: "Pending", country: "Mexico"},
    {name:"Anna Voronova", submitted: new Date("1/1/2024"), status: "Pending", country: "France"},
  ]
}))
