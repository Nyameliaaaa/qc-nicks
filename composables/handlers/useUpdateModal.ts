function useUpdateMacro(value: boolean): void;
function useUpdateMacro(value: boolean, modal: string): void;
function useUpdateMacro<T = {}>(value: boolean, modal: string, data: T): void;
function useUpdateMacro<T = {}>(value: boolean, modal?: string, data?: T): void {
	const state = useModal<T>();
	state.value = {
		open: value,
		modal: modal ?? '',
		// @ts-expect-error Trying to remove a null resulting from data and T not being used results in an error about {} not matching T, which does not exist
		data: data ?? {}
	};
}

export default useUpdateMacro;
