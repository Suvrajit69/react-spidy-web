import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
    input: 'src/index.tsx',
    output: {
        dir: "dist",
        format: "es",
        name: "react-spidy-web"
    },
    external: ["react", "react-dom"],
    plugins: [typescript({ tsconfig: "tsconfig.json" })],

})