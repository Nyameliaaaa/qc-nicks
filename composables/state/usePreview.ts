import { OutputLexicalNode } from "~~/utils/types";

export default function () {
	const colorMap = useColorMap();
	const nick = useNick();

	return useState<OutputLexicalNode[]>("preview", () => [
		{ color: colorMap["f"], text: nick.value },
	]);
}
