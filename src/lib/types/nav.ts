export interface NavItem {
	id: string;
	label: string;
	href?: string;
	icon?: string;
	children?: NavItem[];
	badge?: string | number;
}

export interface NavSection {
	id: string;
	label: string;
	href: string;
	icon?: string;
}
