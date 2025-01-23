export default function () {
	const macroState = useMacro();
	const nick = useNick();

	const { macro, repeat } = macroState.value;

	nick.value = nick.value
		.replaceAll(/&([A-Fr0-9]|#[0-9A-F]{6})/gi, '')
		.replaceAll('&#', '');

	let out = '';
	const colorPattern = macro.includes('#')
		? macro
				.slice(1)
				.split('#')
				.map(color => `#${color}`)
		: macro.split('');

	if (!macro || macro === '') {
		return;
	}

	if (nick.value.length < colorPattern.length) {
		useUpdateModal<{ nickLen: number; colorLen: number; objType: string }>(
			true,
			'NickSizeTooShort',
			{
				colorLen: colorPattern.length,
				nickLen: nick.value.length,
				objType: 'macro'
			}
		);
		return;
	}

	if (repeat) {
		const inputChunk = useArraySplitting(nick.value.split(''), 2);

		out = inputChunk
			.map(
				(chunk, index) => `&${colorPattern[index % colorPattern.length]}${chunk}`
			)
			.join('');
	} else {
		let charAmount = nick.value.length / colorPattern.length;

		for (let index = 0; index < colorPattern.length; index++) {
			out += `&${colorPattern[index]}${nick.value.slice(
				Math.floor(charAmount * index),
				Math.floor(charAmount * (index + 1))
			)}`;
		}
	}

	nick.value = out;
}
