export interface PrideMCColor {
	name: string;
	code: string;
	repeat?: boolean;
}

export interface PrideColor {
	name: string;
	code: string[];
	repeat?: boolean;
}

export interface BlockMCColor {
	bg: string;
	text: string;
	code: string;
	name: string;
}

export interface OutputLexicalNode {
	color: string;
	text: string;
}
