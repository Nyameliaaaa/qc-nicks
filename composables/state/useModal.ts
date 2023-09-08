export default function <T = {}>() {
	return useState("modal", () => ({
		open: false,
		modal: "",
		data: {} as T
	}));
}
