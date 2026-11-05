import React, { useState } from 'react';
import { NewsroomJSONOutput } from '../types';
import { Database, Copy, Download, Check, Code, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface JsonExportProps {
  jsonData: NewsroomJSONOutput;
  onUpdateReviewStatus: (status: 'pending' | 'approved' | 'rejected') => void;
}

export const JsonExport: React.FC<JsonExportProps> = ({
  jsonData,
  onUpdateReviewStatus
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullJson, setShowFullJson] = useState(false);

  // Format JSON string
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
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
      
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-red-50 text-manorama-red">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Export Results & Publishing JSON
            </h2>
            <p className="text-[11px] text-slate-400">
              Standardized payload ready for CMS, news API, or digital publishing pipeline
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          
          {/* Review status selector */}
          <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-md text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Status:</span>
            <select
              value={jsonData.reviewStatus}
              onChange={(e) => onUpdateReviewStatus(e.target.value as any)}
              className="bg-transparent font-semibold text-xs text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="pending">⏳ Pending Review</option>
              <option value="approved">✅ Approved</option>
              <option value="rejected">❌ Rejected</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
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
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-manorama-red hover:bg-manorama-darkRed text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      {/* Structured Code Preview */}
      <div className="mt-3 relative rounded-lg border border-slate-200 bg-slate-900 overflow-hidden text-slate-200 font-mono text-xs">
        <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Code className="w-3.5 h-3.5 text-manorama-lightRed" />
            <span>schema: newsbridge-article-publish-v1.json</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFullJson(!showFullJson)}
            className="hover:text-white transition-colors underline"
          >
            {showFullJson ? 'Collapse Preview' : 'Expand Full Payload'}
          </button>
        </div>

        <pre className={`p-3.5 overflow-x-auto text-[11px] leading-relaxed ${showFullJson ? 'max-h-[450px]' : 'max-h-[160px]'}`}>
          <code>{jsonString}</code>
        </pre>
      </div>

    </div>
  );
};
