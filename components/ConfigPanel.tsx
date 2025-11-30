import React from 'react';
import { Subject } from '../types';
import { Settings, FileText, BookOpen, Hash, Key } from 'lucide-react';

interface ConfigPanelProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  subject: Subject;
  setSubject: (subject: Subject) => void;
  topic: string;
  setTopic: (topic: string) => void;
  sourceText: string;
  setSourceText: (text: string) => void;
  questionCount: number;
  setQuestionCount: (count: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  apiKey,
  setApiKey,
  subject,
  setSubject,
  topic,
  setTopic,
  sourceText,
  setSourceText,
  questionCount,
  setQuestionCount,
  onGenerate,
  isGenerating,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-6">
      <div className="flex items-center gap-2 mb-6 text-indigo-700">
        <Settings className="w-6 h-6" />
        <h2 className="text-xl font-bold">試卷設定</h2>
      </div>

      <div className="space-y-6">
        {/* API Key Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Key className="w-4 h-4" />
            Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="請輸入您的 API Key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-gray-500">
            您的 Key 僅用於本次請求，不會被儲存。
          </p>
        </div>

        {/* Subject Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <BookOpen className="w-4 h-4" />
            考試科目
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          >
            {Object.values(Subject).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4" />
            單元主題
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="例如：光合作用、一次方程式、唐詩"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Question Count */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Hash className="w-4 h-4" />
            題目數量
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Source Text Area */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4" />
            參考教材內容 (選填)
          </label>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="請在此貼上課文、講義內容，AI 將根據此內容出題..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating || !apiKey}
          className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2
            ${
              isGenerating || !apiKey
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成題目中...
            </>
          ) : (
            '開始生成試卷'
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;