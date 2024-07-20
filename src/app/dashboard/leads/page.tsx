"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useMemo, useState } from "react";
import { Lead, useStore } from "@/store/useStore";

export default function LeadsPage() {
  const { leads, updateLeads } = useStore();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();

    console.log(data);

    const LeadData: Lead[] = data.response.map(
      (item: any): Lead => ({
        name: `${item.firstname} ${item.lastname}`,
        email: `${item.email}`,
        status: Boolean(item.contacted) ? "REACHED_OUT" : "PENDING",
        submitted: item.date ? new Date(item.date).toDateString() : "",
      })
    );

    updateLeads(LeadData);

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchLeads();
  }, []);

  const filteredData = useMemo(() => {
    return leads.filter(
      (item) =>
        !input || item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }, [leads, input]);

  if (isLoading || !leads.length) {
    return;
  }

  return (
    <>
      <h1 className="text-4xl py-10">Leads</h1>
      <main>
        <input
          type="text"
          className="border rounded-full mb-5 px-5 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {leads.length &&
                  Object.keys(leads[0]).map((name, idx) => (
                    <TableCell key={`${idx}-${name}`} className="capitalize">
                      {name}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
}
