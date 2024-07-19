import { withJsonFormsControlProps } from "@jsonforms/react";
import { FileUpload } from "./FileUpload";
import { rankWith, scopeEndsWith } from "@jsonforms/core";

interface FileUploadControlProps {
  data: string;
  handleChange(path: string, value: string): void;
  path: string;
}

const FileUploadControl = ({
  data,
  handleChange,
  path,
}: FileUploadControlProps) => (
  <FileUpload
    value={data}
    updateValue={(newValue: string) => handleChange(path, newValue)}
  />
);

// Fast refresh can't handle anonymous components.
const FileUploadControlWithJsonForms =
  withJsonFormsControlProps(FileUploadControl);
export default FileUploadControlWithJsonForms;

export const FileUploadControlTester = rankWith(
  3, //increase rank as needed
  scopeEndsWith("file_upload")
);
