import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [".open-next/**", "node_modules/**", "work/**", "outputs/**"],
  },
];

export default eslintConfig;
