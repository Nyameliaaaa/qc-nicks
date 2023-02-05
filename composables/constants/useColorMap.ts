export default function () {
	const blockMCColors = useBlockMCColors();
	const colorMap: Record<string, string> = {};

	blockMCColors.map(
		(color) => (colorMap[color.hexId] = color.backgroundColor)
	);

	return colorMap;
}
