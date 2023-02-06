export default function () {
	return useState("modal", () => ({
		open: false,
		modal: "",
	}));
}
