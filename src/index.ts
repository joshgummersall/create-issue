import * as core from "@actions/core";
import { Toolkit } from "actions-toolkit";

type Inputs = {
  title: string;
  body?: string;
  labels?: string;
};

Toolkit.run<Inputs>(async (tools) => {
  const { body, title, labels: maybeLabels } = tools.inputs;

  let labels: string[] = [];
  if (maybeLabels) {
    labels = JSON.parse(maybeLabels);
  }

  const { owner, repo } = tools.context.repo;

  const resp = await tools.github.issues.create({
    body,
    labels,
    owner,
    repo,
    title,
  });

  core.setOutput("url", resp.url);
});
