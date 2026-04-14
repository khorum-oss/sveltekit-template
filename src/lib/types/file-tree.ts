export interface FileNode {
	name: string;
	type: 'file' | 'folder';
	children?: FileNode[];
	icon?: string;
	meta?: string;
}
