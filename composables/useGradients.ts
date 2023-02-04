import { PrideColor } from "~~/utils/types";

export default function (): PrideColor[] {
	// does not specify repeat because gradients WILL skip generation using macros all together.
	return [
		{
			name: "Asexual",
			colors: ["#810081", "#FFFFFF", "#A4A4A4", "#000000"],
		},
		{
			name: "Bisexual",
			colors: ["#D60270", "#9B4F96", "#0038A8"],
		},
		{
			name: "Genderqueer",
			colors: ["#B77FDD", "#FFFFFF", "#48821E"],
		},
		{
			name: "Lesbian",
			colors: ["#D62900", "#FFFFFF", "#A50062"],
		},
		{
			name: "Omnisexual",
			colors: ["#ff9ccd", "#ff53bd", "#270046", "#675ffe", "#8ca7ff"],
		},
		{
			name: "Non-Binary",
			colors: ["#FFF430", "#FFFFFF", "#9C59D1", "#000000"],
		},
		{
			name: "Pansexual",
			colors: ["#FF1B8D", "#FFDA00", "#1BB3FF"],
		},
		{
			name: "Rainbow",
			colors: [
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
			colors: ["#FF9B9B", "#FFFF9B", "#9BFF9B", "#9BFFFF", "#9B9BFF"],
		},
		{
			name: "Trans",
			colors: ["#55CDFC", "#FFFFFF", "#F7A8B8"],
		},
		{
			name: "Trans",
			colors: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
		},
	];
}
