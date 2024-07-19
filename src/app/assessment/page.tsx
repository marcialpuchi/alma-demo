"use client";

import { ValidationMode } from "@jsonforms/core";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { Button } from "@mui/material";
import { FormEvent, useState } from "react";
import { Header } from "./Header";
import MyGroupRenderer, { myGroupTester } from "./MyGroup";
import schema from "./schema.json";
import uischema from "./uischema.json";
import { useRouter } from "next/navigation";
import { submitAssesment } from "./actions";

const renderers = [
  ...materialRenderers,
  { tester: myGroupTester, renderer: MyGroupRenderer },
];

export default function LeadForm() {
  const router = useRouter();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState(0);

  const [validationMode, setValidationMode] =
    useState<ValidationMode>("ValidateAndHide");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationMode("ValidateAndShow");

    if (errors) {
      console.log("🔥 TODO: handle errors");
      return;
    }

    submitAssesment(data);
  };

  return (
    <>
      <Header title="get an assesment of your immigration case" />
      <div className="container mx-auto flex flex-col items-center max-w-2xl py-10">
        <div className="font-bold text-center pt-10 mb-14">
          <img src="/images/info.png" className="mx-auto" />
          <h3 className="text-2xl my-4">
            Want to understand your visa options?
          </h3>
          <p className="text-lg my-2">
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>
        </div>
        <form className="max-w-lg" onSubmit={handleSubmit}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data, errors }) => {
              setData(data);
              setErrors(errors?.length ?? 0);
            }}
            validationMode={validationMode}
          />
          <Button
            type="submit"
            variant="contained"
            data-testid="clear-data"
            className="w-full py-5 bg-black text-white font-bold rounded-xl hover:opacity-80 hover:bg-black transition-opacity"
          >
            Submit
          </Button>
        </form>
        <footer className="mt-10">
          <span className="text-xs text-[#9D9D9D]">
            By continuing, you agree to our Terms and have read our Privacy
            Policy
          </span>
        </footer>
      </div>
    </>
  );
}
