
import React from "react";
import { Issue } from "../types";
import { IssueCard } from "../IssueCard";

interface YearGroupListProps {
  issuesByYear: Record<number, Issue[]>;
  sortedYears: number[];
}

export const YearGroupList = ({ issuesByYear, sortedYears }: YearGroupListProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-primary">Info Gazette Médicale</h2>
      </div>
      
      {sortedYears.map((year) => (
        <div key={year} className="mb-10">
          <h3 className="text-lg font-semibold mb-4">{year}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issuesByYear[year].map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
