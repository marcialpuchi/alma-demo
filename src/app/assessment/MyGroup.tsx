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
    <section className="font-bold text-center mb-10">
      <img src={uischema.imgSrc} className="mx-auto" />
      <h3 className="text-2xl mb-4">{uischema.label}</h3>
      <MaterialLayoutRenderer {...layoutProps} />
    </section>
  );
};

export default withJsonFormsLayoutProps(MyGroupRenderer);
