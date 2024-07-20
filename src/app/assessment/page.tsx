"use client";

import { ValidationMode } from "@jsonforms/core";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Header } from "./Header";
import MyGroupRenderer, { myGroupTester } from "./MyGroup";
import FileUploadControlWithJsonForms, {
  FileUploadControlTester,
} from "./FileUploadControl";
import { Section } from "./Section";
import schema from "./schema.json";
import uischema from "./uischema.json";

const renderers = [
  ...materialRenderers,
  { tester: myGroupTester, renderer: MyGroupRenderer },
  { tester: FileUploadControlTester, renderer: FileUploadControlWithJsonForms },
];

export default function LeadForm() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [validationMode, setValidationMode] =
    useState<ValidationMode>("ValidateAndHide");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationMode("ValidateAndShow");

    if (errors) {
      setIsLoading(false);
      return;
    }

    const response = await fetch("/api/leads", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setFormSubmitted(true);
    }
  };

  if (formSubmitted) {
    return (
      <div className="container mx-auto flex flex-col items-center max-w-2xl mt-56">
        <Section
          label="thank you"
          description="Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai"
          imgSrc="/images/dice.png"
        >
          <Link
            href="/"
            data-testid="clear-data"
            className="p-5 bg-black text-white font-bold rounded-xl hover:opacity-80 hover:bg-black transition-opacity capitalize"
          >
            go back to homepage
          </Link>
        </Section>
      </div>
    );
  }

  return (
    <>
      <Header title="get an assesment of your immigration case" />
      <div className="container mx-auto flex flex-col items-center max-w-2xl py-10">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
          <button
            disabled={isLoading}
            type="submit"
            data-testid="clear-data"
            className="w-3/5 py-5 bg-black text-white font-bold rounded-xl  transition-opacity disabled:bg-slate-300"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
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
