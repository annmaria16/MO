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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 transition-all">
      
      {/* Compact Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-manorama-red text-white text-xs font-black">
            3
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Key Information
            </h3>
            <p className="text-xs text-slate-500">
              AI-extracted named entities (people, places, organisations) and topical keyword index.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          {isDemoEngine ? 'Demo Extraction' : 'NER Engine'}
        </span>
      </div>

      {/* 4 Compact Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        
        {/* People */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800 mb-1.5">
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>People</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {entities.people && entities.people.length > 0 ? (
              entities.people.map((person, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                >
                  {person}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic">None detected</span>
            )}
          </div>
        </div>

        {/* Places */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-800 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Places</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {entities.places && entities.places.length > 0 ? (
              entities.places.map((place, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                >
                  {place}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic">None detected</span>
            )}
          </div>
        </div>

        {/* Organisations */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-800 mb-1.5">
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Organisations</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {entities.organisations && entities.organisations.length > 0 ? (
              entities.organisations.map((org, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                >
                  {org}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic">None detected</span>
            )}
          </div>
        </div>

        {/* Keywords */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1.5">
            <Hash className="w-3.5 h-3.5 text-slate-500" />
            <span>Keywords & Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {keywords && keywords.length > 0 ? (
              keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                >
                  #{kw}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic">No tags</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
