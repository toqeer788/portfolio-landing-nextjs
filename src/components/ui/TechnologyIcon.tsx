import {
	Atom,
	Triangle,
	BookOpen,
	Palette,
	Circle,
	Database,
	Leaf,
	Bot,
	Link,
	BarChart3,
	Ship,
	Cloud,
} from 'lucide-react';

interface TechnologyIconProps {
	name: string;
	className?: string;
}

const TechnologyIcon = ({
	name,
	className = 'w-6 h-6',
}: TechnologyIconProps) => {
	const iconMap: Record<string, React.ReactNode> = {
		React: <Atom className={className} />,
		'Next.js': <Triangle className={className} />,
		TypeScript: <BookOpen className={className} />,
		'Tailwind CSS': <Palette className={className} />,
		'Node.js': <Circle className={className} />,
		PostgreSQL: <Database className={className} />,
		MongoDB: <Leaf className={className} />,
		'OpenAI API': <Bot className={className} />,
		Langchain: <Link className={className} />,
		'Vector DB': <BarChart3 className={className} />,
		Docker: <Ship className={className} />,
		Vercel: <Triangle className={className} />,
		AWS: <Cloud className={className} />,
	};

	return <>{iconMap[name] || <Circle className={className} />}</>;
};

export default TechnologyIcon;
