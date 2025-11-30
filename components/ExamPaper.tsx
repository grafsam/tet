import React from 'react';
import { Question, Subject } from '../types';
import { Printer, CheckCircle, AlertCircle } from 'lucide-react';

interface ExamPaperProps {
  questions: Question[];
  subject: Subject;
  topic: string;
}

const ExamPaper: React.FC<ExamPaperProps> = ({ questions, subject, topic }) => {
  const handlePrint = () => {
    window.print();
  };

  if (questions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl p-12 bg-white/50">
        <AlertCircle className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-lg">尚無題目，請在左側設定並生成試卷</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 no-print">
        <div className="text-gray-600">
          <span className="font-bold text-gray-900">{questions.length}</span> 題已生成
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 shadow-sm transition-all"
        >
          <Printer className="w-4 h-4" />
          列印 / 存為 PDF
        </button>
      </div>

      {/* Paper Content */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="border-b-2 border-gray-800 p-8 text-center print:p-0 print:mb-6 print:border-b-2">
          <h1 className="text-3xl font-black text-gray-900 mb-2 font-serif tracking-wide">
            114學年度國中模擬試題本
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 font-serif mb-4">
            {subject}科 ({topic})
          </h2>
          <div className="flex justify-center gap-8 text-sm text-gray-600 print:text-black">
            <div className="border border-gray-400 px-4 py-1">班級：__________</div>
            <div className="border border-gray-400 px-4 py-1">座號：__________</div>
            <div className="border border-gray-400 px-4 py-1">姓名：__________</div>
          </div>
        </div>

        {/* Questions */}
        <div className="p-8 print:p-0">
          <div className="space-y-8">
            {questions.map((q) => (
              <div key={q.id} className="break-inside-avoid">
                <div className="flex gap-2 mb-3">
                  <span className="font-bold text-lg min-w-[1.5rem]">{q.id}.</span>
                  <p className="text-lg text-gray-900 leading-relaxed text-justify font-medium">
                    {q.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 pl-8">
                  {q.options.map((opt) => (
                    <div key={opt.label} className="flex gap-2 items-start">
                      <span className="font-semibold">({opt.label})</span>
                      <span>{opt.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Key & Explanation (Usually printed on a separate page or bottom) */}
        <div className="mt-12 border-t-4 border-double border-gray-300 p-8 bg-gray-50 print:bg-white print:break-before-page">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <CheckCircle className="w-6 h-6 text-green-600" />
            解答與解析
          </h3>
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-indigo-700">第 {q.id} 題</span>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold border border-indigo-200">
                    答案：{q.correctAnswer}
                  </span>
                </div>
                <div className="text-gray-700 pl-4 border-l-4 border-gray-300 text-sm leading-relaxed">
                  <span className="font-bold text-gray-900">解析：</span>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPaper;