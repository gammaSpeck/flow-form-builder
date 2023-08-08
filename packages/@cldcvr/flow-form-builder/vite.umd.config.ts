import { defineConfig } from "vite";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			name: "flowFormBuilder",
			fileName: format => `flow-form-builder.${format}.js`,
			formats: ["umd"]
		},
		outDir: "umd",
		rollupOptions: {
			external: ["@cldcvr/flow-core"],
			output: {
				globals: {
					"@cldcvr/flow-core": "flowCore"
				}
			}
		}
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src/index.ts")
		}
	},
	plugins: [litcss()]
});
