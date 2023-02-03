import { PrideColor } from "~~/utils/types";

export default function (): PrideColor[] {
	// does not specify repeat because gradients WILL skip generation using macros all together.
	return [
		{
			name: "Asexual",
			code: ["#810081", "#FFFFFF", "#A4A4A4", "#000000"],
		},
		{
			name: "Bisexual",
			code: ["#D60270", "#9B4F96", "#0038A8"],
		},
		{
			name: "Genderqueer",
			code: ["#B77FDD", "#FFFFFF", "#48821E"],
		},
		{
			name: "Lesbian",
			code: ["#D62900", "#FFFFFF", "#A50062"],
		},
		{
			name: "Omnisexual",
			code: ["#ff9ccd", "#ff53bd", "#270046", "#675ffe", "#8ca7ff"],
		},
		{
			name: "Non-Binary",
			code: ["#FFF430", "#FFFFFF", "#9C59D1", "#000000"],
		},
		{
			name: "Pansexual",
			code: ["#FF1B8D", "#FFDA00", "#1BB3FF"],
		},
		{
			name: "Rainbow",
			code: [
				"#FF0018",
				"#FFA52C",
				"#FFFF41",
				"#008018",
				"#0000F9",
				"#86007D",
			],
		},
		{
			name: "Pastel Pride",
			code: ["#FF9B9B", "#FFFF9B", "#9BFF9B", "#9BFFFF", "#9B9BFF"],
		},
		{
			name: "Trans",
			code: ["#55CDFC", "#FFFFFF", "#F7A8B8"],
		},
		{
			name: "Trans",
			code: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
		},
	];
}
