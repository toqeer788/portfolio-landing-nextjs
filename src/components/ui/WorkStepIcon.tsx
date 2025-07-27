import {
	Search,
	Building2,
	Code,
	TestTube,
	Rocket,
	Wrench,
} from 'lucide-react';

interface WorkStepIconProps {
	title: string;
	className?: string;
}

const WorkStepIcon = ({ title, className = 'w-8 h-8' }: WorkStepIconProps) => {
	const iconMap: Record<string, React.ReactNode> = {
		Исследование: <Search className={className} />,
		Архитектура: <Building2 className={className} />,
		Разработка: <Code className={className} />,
		Тестирование: <TestTube className={className} />,
		Деплой: <Rocket className={className} />,
		Поддержка: <Wrench className={className} />,
	};

	return <>{iconMap[title] || <Code className={className} />}</>;
};

export default WorkStepIcon;
