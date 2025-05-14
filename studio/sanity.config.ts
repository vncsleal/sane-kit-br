import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { codeInput } from "@sanity/code-input";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import Logo from "./components/Logo";
import { ptBRLocale } from "@sanity/locale-pt-br";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
	icon: Logo,
	name: "default",
	title: "Sane Kit Studio",
	projectId,
	dataset,
	plugins: [
		structureTool(),
		visionTool(),
		codeInput(),
		unsplashImageAsset(),
		ptBRLocale(),
	],
	schema: {
		types: schemaTypes,
	},
});
