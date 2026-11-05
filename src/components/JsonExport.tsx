import React, { useState } from 'react';
import { NewsroomJSONOutput, ReviewStatus } from '../types';
import { Database, Copy, Download, Check, Code } from 'lucide-react';

interface JsonExportProps {
  jsonData: NewsroomJSONOutput;
  onUpdateReviewStatus: (status: ReviewStatus) => void;
}

export const JsonExport: React.FC<JsonExportProps> = ({
  jsonData,
  onUpdateReviewStatus
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullJson, setShowFullJson] = useState(false);

  const jsonString = JSON.stringify(jsonData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    link.href = url;
    link.download = `newsbridge-publish-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 transition-all">
      
      {/* Export Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black">
              5
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Export Publishing JSON
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9.5">
            Clean, structured JSON payload ready for CMS ingestion, wire syndication, or digital news pipelines.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Review status selector */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-500 font-semibold">Review Status:</span>
            <select
              value={jsonData.reviewStatus}
              onChange={(e) => onUpdateReviewStatus(e.target.value as ReviewStatus)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Pending Review">Pending Review</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Approved for Preview">Approved for Preview</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-manorama-red hover:bg-manorama-darkRed text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-900 overflow-hidden text-slate-200 font-mono text-xs">
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Code className="w-3.5 h-3.5 text-manorama-lightRed" />
            <span>Schema: newsbridge-publish-v1.json</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFullJson(!showFullJson)}
            className="hover:text-white transition-colors underline"
          >
            {showFullJson ? 'Collapse Preview' : 'Expand Full Payload'}
          </button>
        </div>

        <pre className={`p-4 overflow-x-auto text-[11px] leading-relaxed ${showFullJson ? 'max-h-[500px]' : 'max-h-[180px]'}`}>
          <code>{jsonString}</code>
        </pre>
      </div>

    </div>
  );
};
