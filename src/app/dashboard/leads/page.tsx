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
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import LoadingButton from "@mui/lab/LoadingButton";

export default function LeadsPage() {
  const { leads, updateLeads, toggleLeadUpdatingState } = useStore();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchLeads();
    // There is no need to add additional dependencies since we only want to fetch once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = useMemo(() => {
    return leads.filter(
      (item) =>
        !input || item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }, [leads, input]);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();

    const LeadData: Lead[] = data.response.map(
      (item: any): Lead => ({
        id: `${item.id}`,
        name: `${item.firstname} ${item.lastname}`,
        email: `${item.email}`,
        status: Boolean(item.contacted) ? "REACHED_OUT" : "PENDING",
        submitted: item.date ? new Date(item.date).toDateString() : "",
      })
    );

    updateLeads(LeadData);

    setIsLoading(false);
  };

  const toggleContacted = async (
    leadId: string,
    status: "REACHED_OUT" | "PENDING"
  ) => {
    toggleLeadUpdatingState(leadId);

    const response = await fetch("/api/leads", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: leadId,
        contacted: status === "PENDING",
      }),
    });

    toggleLeadUpdatingState(leadId);

    if (response.status === 200) {
      fetchLeads();
    }
  };

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
                <TableCell className="capitalize">Name</TableCell>
                <TableCell className="capitalize">Email</TableCell>
                <TableCell className="capitalize">Status</TableCell>
                <TableCell className="capitalize">Submitted</TableCell>
                <TableCell className="capitalize">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                  <TableCell>
                    <LoadingButton
                      variant="contained"
                      aria-label="toggle customer contacted"
                      loading={row.isUpdating}
                      onClick={() => toggleContacted(row.id, row.status)}
                    >
                      {row.status === "PENDING" ? (
                        <DoneAllIcon />
                      ) : (
                        <RemoveDoneIcon />
                      )}
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
}
