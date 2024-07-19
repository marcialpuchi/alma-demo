"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo, useState } from "react";
import { useStore } from "@/store/useStore";

export default function () {
  const { leads } = useStore();

  const [input, setInput] = useState("");

  const filteredData = useMemo(() => {
    return leads.filter(
      (item) =>
        !input || item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  }, [leads, input]);

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
                {Object.keys(leads[0]).map((name) => (
                  <TableCell className="capitalize">{name}</TableCell>
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
                  <TableCell>{row.submitted.toISOString()}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
}
