import { Link as MUILink } from '@mui/material';
import Link from 'next/link';

export type LinkProps = {
	href: string;
	as?: string;
	label: string;
	color?: 'inherit' | 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error'
};

const CustomLink = ({ href, as, label, color = 'inherit' }: LinkProps) => {
	return (
		<Link passHref href={href} as={as}>
			<MUILink color={color}>{label}</MUILink>
		</Link>
	);
}

export default CustomLink;