import { useTheme } from '../../../context/ThemeContext';

export default function ThemeToggle() {
  const { toggle, isDark } = useTheme();

  return (
    <button onClick={toggle} className="text-sm text-gray-700 dark:text-gray-300">
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
