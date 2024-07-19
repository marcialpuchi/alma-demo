import {
  MaterialLayoutRenderer,
  MaterialLayoutRendererProps,
} from "@jsonforms/material-renderers";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Hidden,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import {
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  Layout,
  UISchemaElement,
  rankWith,
  uiTypeIs,
} from "@jsonforms/core";
import Image from "next/image";
import { Section } from "./Section";

export const myGroupTester = rankWith(1000, uiTypeIs("Group"));

const MyGroupRenderer = (props: any) => {
  const { uischema, schema, path, visible, renderers } = props;

  const layoutProps: MaterialLayoutRendererProps = {
    elements: uischema.elements,
    schema: schema,
    path: path,
    direction: "column",
    visible: visible,
    uischema: uischema,
    renderers: renderers,
  };

  return (
    <Section
      label={uischema.label}
      description={uischema.description}
      imgSrc={uischema.imgSrc}
    >
      <div className="mt-10 w-3/5 mx-auto">
        <MaterialLayoutRenderer {...layoutProps} />
      </div>
    </Section>
  );
};

export default withJsonFormsLayoutProps(MyGroupRenderer);
