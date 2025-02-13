import React, { useState, useEffect } from 'react';
import { Brain, ChevronDown, Sun, Moon, Palette, Zap, Bot, Sparkles } from 'lucide-react';
import { solveProblem } from './utils/api';
import { Theme, AIProvider } from './types';
import { CSSTransition } from 'react-transition-group';

const subjects = {
  Mathematics: {
    'Basic Algebra': [
      'Linear Equations',
      'Linear Inequalities',
      'Systems of Linear Equations',
      'Quadratic Equations',
      'Quadratic Inequalities',
      'Rational Equations',
    ],
    'Advanced Algebra': [
      'Polynomials',
      'Polynomial Functions',
      'Exponential Functions',
      'Logarithmic Functions',
      'Complex Numbers',
      'Matrices',
    ],
    'Pre-Calculus': [
      'Trigonometry',
      'Trigonometric Functions',
      'Inverse Trigonometric Functions',
      'Conic Sections',
      'Sequences and Series',
      'Vectors',
    ],
    'Calculus': [
      'Limits',
      'Derivatives',
      'Integration',
      'Differential Equations',
    ],
    'Statistics': [
      'Probability',
      'Statistical Analysis',
      'Data Distribution',
      'Hypothesis Testing',
    ],
  },
  Physics: {
    'Mechanics': [
      'Kinematics',
      'Newton\'s Laws',
      'Work and Energy',
      'Momentum',
      'Circular Motion',
      'Gravitation',
    ],
    'Waves': [
      'Wave Properties',
      'Sound Waves',
      'Light and Optics',
      'Electromagnetic Waves',
      'Wave Interference',
    ],
    'Thermodynamics': [
      'Heat and Temperature',
      'Laws of Thermodynamics',
      'Heat Transfer',
      'Thermal Properties',
    ],
    'Electricity': [
      'Electric Fields',
      'Electric Potential',
      'Circuits',
      'Magnetism',
      'Electromagnetic Induction',
    ],
    'Modern Physics': [
      'Quantum Mechanics',
      'Special Relativity',
      'Nuclear Physics',
      'Atomic Structure',
    ],
  },
  Chemistry: {
    'Physical Chemistry': [
      'Chemical Kinetics',
      'Thermochemistry',
      'Chemical Equilibrium',
      'Electrochemistry',
      'Solutions',
    ],
    'Organic Chemistry': [
      'Hydrocarbons',
      'Functional Groups',
      'Reaction Mechanisms',
      'Stereochemistry',
      'Polymers',
    ],
    'Inorganic Chemistry': [
      'Periodic Table',
      'Chemical Bonding',
      'Coordination Compounds',
      'Acid-Base Chemistry',
      'Redox Reactions',
    ],
    'Analytical Chemistry': [
      'Qualitative Analysis',
      'Quantitative Analysis',
      'Spectroscopy',
      'Chromatography',
    ],
    'Biochemistry': [
      'Proteins',
      'Carbohydrates',
      'Lipids',
      'Nucleic Acids',
      'Enzymes',
    ],
  },
};

const themes: { value: Theme; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'light', label: 'Light', icon: <Sun />, color: 'text-yellow-500' },
  { value: 'dark', label: 'Dark', icon: <Moon />, color: 'text-blue-500' },
  { value: 'pink', label: 'Pink', icon: <Palette />, color: 'text-pink-500' },
  { value: 'green', label: 'Green', icon: <Palette />, color: 'text-emerald-500' },
  { value: 'oled', label: 'OLED', icon: <Zap />, color: 'text-purple-500' },
];

const aiProviders: { value: AIProvider; label: string; description: string }[] = [
  { 
    value: 'deepseek',
    label: 'DeepSeek',
    description: 'Specialized in mathematical problem-solving'
  },
  {
    value: 'gemini',
    label: 'Gemini',
    description: 'Advanced reasoning and step-by-step explanations'
  },
  {
    value: 'mistral',
    label: 'Mistral',
    description: 'Efficient and accurate problem solutions'
  }
];

function App() {
  const [subject, setSubject] = useState('Mathematics');
  const [category, setCategory] = useState('Basic Algebra');
  const [subcategory, setSubcategory] = useState('Linear Equations');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [provider, setProvider] = useState<AIProvider>('deepseek');
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
    const firstCategory = Object.keys(subjects[newSubject as keyof typeof subjects])[0];
    setCategory(firstCategory);
    setSubcategory(subjects[newSubject as keyof typeof subjects][firstCategory][0]);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubcategory(subjects[subject as keyof typeof subjects][newCategory][0]);
  };

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setShowSolution(false);
    setLoading(true);
    try {
      const result = await solveProblem(
        `[${subject} - ${category} - ${subcategory}] ${problem}`,
        provider
      );
      setSolution(result);
      setShowSolution(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-[var(--primary)]" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--primary)]">AI Problem Solver</h1>
              <p className="text-[var(--text-secondary)]">Step-by-step solutions powered by AI</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`theme-button ${theme === t.value ? 'active' : ''} ${t.color}`}
                title={t.label}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </header>

        <div className="container-dark">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-[var(--text-secondary)] mb-2">AI Provider</label>
              <div className="relative">
                <select 
                  className="dropdown appearance-none"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as AIProvider)}
                >
                  {aiProviders.map((p) => (
                    <option key={p.value} value={p.value} title={p.description}>{p.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-[var(--text-secondary)] mb-2">Subject</label>
              <div className="relative">
                <select 
                  className="dropdown appearance-none"
                  value={subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                >
                  {Object.keys(subjects).map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-[var(--text-secondary)] mb-2">Category</label>
              <div className="relative">
                <select 
                  className="dropdown appearance-none"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {Object.keys(subjects[subject as keyof typeof subjects]).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-[var(--text-secondary)] mb-2">Topic</label>
              <div className="relative">
                <select 
                  className="dropdown appearance-none"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  {subjects[subject as keyof typeof subjects][category].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSolve}>
            <div className="mb-6">
              <label className="block text-[var(--text-secondary)] mb-2">Enter Your Problem</label>
              <textarea
                className="input-area"
                placeholder={`Type or paste your ${subject.toLowerCase()} problem here...`}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="solve-button"
              disabled={loading || !problem.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Bot className="w-5 h-5 loading-pulse" />
                  Solving...
                </span>
              ) : (
                'Solve Problem'
              )}
            </button>
          </form>

          <CSSTransition
            in={showSolution}
            timeout={300}
            classNames="solution"
            unmountOnExit
          >
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Solution</h2>
              <div className="bg-[var(--bg-tertiary)] rounded-lg p-6 text-[var(--text-primary)]">
                <pre className="whitespace-pre-wrap font-mono">{solution}</pre>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}

export default App;