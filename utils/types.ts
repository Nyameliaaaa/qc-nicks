export interface PrideColor {
	name: string;
	colors: string[];
	repeat?: boolean;
}

export interface BlockMCColor {
	backgroundColor: string;
	textColor: string;
	hexId: string;
	colorName: string;
}

export interface OutputLexicalNode {
	color: string;
	text: string;
}
