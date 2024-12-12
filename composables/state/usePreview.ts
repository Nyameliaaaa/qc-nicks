export default function () {
	return useState<OutputLexicalNode[]>('preview', () => [
		{ color: useColorMap()['f'], text: '<3' }
	]);
}
	