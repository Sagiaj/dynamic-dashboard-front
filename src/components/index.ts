import Vue from "vue";

const kebabCaseRegex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

const toKebabCase = (str: string) => {
  const matches = str.match(kebabCaseRegex);
  if (!matches) return "";
  return matches.map((s: string) => s.toLowerCase()).join("-");
};

const requireComponent = require.context("@/components", true, /\.vue$/);
requireComponent.keys().forEach((fileName: string) => {
  const componentConfig = requireComponent(fileName);
  let cases: string[] = [];
  let pureFileName: string = "";
  let matches = fileName.match(/(\w+)\..*/g);
  if (matches && matches.length > 0)
    pureFileName =
      componentConfig.default.name ||
      String(matches.pop()).replace(/(\w+)\..*/g, "$1");
  if (pureFileName && typeof pureFileName === "string") {
    const kebabCase = toKebabCase(pureFileName);
    const titleCase =
      kebabCase.charAt(0).toUpperCase() +
      kebabCase.substr(1).replace(/-\w/g, m => m[1].toUpperCase());
    cases.push(kebabCase);
    cases.push(titleCase);
  }
  for (let componentName of cases) {
    Vue.component(componentName, componentConfig.default || componentConfig);
  }
});
