import { PrideColor } from "~~/utils/types";

export default function (gradient: Pick<PrideColor, "colors">) {
	const nick = useNick();
	const status = useStatus();

	let out = "";
	nick.value = nick.value.replace(/&([0-9a-f]|#[0-9a-f]{6})/gi, "");

	if (nick.value.length < gradient.colors.length) {
		status.value = "Your nickname is too short for this gradient.";
		return;
	}

	const sections = nick.value.length / (gradient.colors.length - 1);
	const stages = gradient.colors.length - 1;

	for (let index = 0; index < stages; index++) {
		const textToSend = nick.value.slice(
			Math.floor(sections * index),
			Math.floor(sections * (index + 1))
		);

		out += useCalculateGradientColors(
			textToSend,
			gradient.colors[index],
			gradient.colors[index + 1]
		);
	}

	nick.value = out;
	useUpdatePreview();
}
