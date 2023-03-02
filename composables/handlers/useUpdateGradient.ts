export default function () {
	const nick = useNick();
	const status = useStatus();
	const colors = useColors();

	let out = "";
	nick.value = nick.value.replace(/&([0-9a-f]|#[0-9a-f]{6})/gi, "");

	if (nick.value.length < colors.value.length) {
		status.value = "Your nickname is too short for this gradient.";
		return;
	}

	const sections = nick.value.length / (colors.value.length - 1);
	const stages = colors.value.length - 1;

	for (let index = 0; index < stages; index++) {
		const textToSend = nick.value.slice(
			Math.floor(sections * index),
			Math.floor(sections * (index + 1))
		);

		out += useCalculateGradientColors(
			textToSend,
			colors.value[index],
			colors.value[index + 1]
		);
	}

	nick.value = out;
}
