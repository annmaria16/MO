import React from 'react';
import { ExtractedEntities } from '../types';
import { Users, MapPin, Building2, Hash, Tag, Info } from 'lucide-react';

interface KeyInformationProps {
  entities: ExtractedEntities;
  keywords: string[];
  isDemoEngine: boolean;
}

export const KeyInformation: React.FC<KeyInformationProps> = ({
  entities,
  keywords,
  isDemoEngine
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-5 h-full flex flex-col justify-between">
      <div>
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <Tag className="w-4 h-4 text-manorama-red" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Key Information
            </h2>
          </div>

          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            {isDemoEngine ? 'Demo Extraction' : 'NER Engine'}
          </span>
        </div>

        {/* Content Rows */}
        <div className="mt-3.5 space-y-3">
          
          {/* People */}
          <div className="flex items-start space-x-2.5">
            <div className="mt-0.5 p-1 rounded bg-amber-50 text-amber-700 shrink-0">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                People
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entities.people && entities.people.length > 0 ? (
                  entities.people.map((person, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50/80 text-amber-900 border border-amber-200/60"
                    >
                      {person}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Places */}
          <div className="flex items-start space-x-2.5">
            <div className="mt-0.5 p-1 rounded bg-blue-50 text-blue-700 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                Places
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entities.places && entities.places.length > 0 ? (
                  entities.places.map((place, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50/80 text-blue-900 border border-blue-200/60"
                    >
                      {place}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Organisations */}
          <div className="flex items-start space-x-2.5">
            <div className="mt-0.5 p-1 rounded bg-purple-50 text-purple-700 shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                Organisations
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entities.organisations && entities.organisations.length > 0 ? (
                  entities.organisations.map((org, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50/80 text-purple-900 border border-purple-200/60"
                    >
                      {org}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">None detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex items-start space-x-2.5 pt-1 border-t border-slate-100">
            <div className="mt-0.5 p-1 rounded bg-slate-100 text-slate-600 shrink-0">
              <Hash className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-500 mb-1">
                Keywords & Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {keywords && keywords.length > 0 ? (
                  keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      #{kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No tags</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Demo disclaimer footer if applicable */}
      {isDemoEngine && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] text-slate-400">
          <Info className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Extracted using local newsroom heuristic rules.</span>
        </div>
      )}
    </div>
  );
};
