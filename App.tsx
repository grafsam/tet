import React, { useState, useEffect } from 'react';
import ConfigPanel from './components/ConfigPanel';
import ExamPaper from './components/ExamPaper';
import { Subject, Question } from './types';
import { generateExamQuestions } from './services/geminiService';
import { GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  // Try to load API key from environment or local storage if implementing persistence
  const [apiKey, setApiKey] = useState<string>(process.env.API_KEY || '');
  const [subject, setSubject] = useState<Subject>(Subject.CHINESE);
  const [topic, setTopic] = useState<string>('');
  const [sourceText, setSourceText] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const generatedQuestions = await generateExamQuestions(
        apiKey,
        subject,
        topic,
        sourceText,
        questionCount
      );
      setQuestions(generatedQuestions);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600">
              國中會考模擬試題生成器
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            專為台灣國中教師設計
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Config */}
          <div className="w-full lg:w-1/3 xl:w-1/4 no-print">
            <ConfigPanel
              apiKey={apiKey}
              setApiKey={setApiKey}
              subject={subject}
              setSubject={setSubject}
              topic={topic}
              setTopic={setTopic}
              sourceText={sourceText}
              setSourceText={setSourceText}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                <strong>錯誤：</strong> {error}
              </div>
            )}
          </div>

          {/* Exam Paper Preview */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <ExamPaper
              questions={questions}
              subject={subject}
              topic={topic || "綜合練習"}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm no-print">
        <p>© {new Date().getFullYear()} Taiwan Junior High Exam Generator. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;