import React from 'react';

const borderClasses = 'border-b border-border px-4 py-2';
const textClasses = 'text-left text-muted-foreground';

const TaxSummary = () => {
  return (
    <div className="overflow-x rounded-lg border border-border bg-card shadow-md dark:bg-card">
      <div className="py-4 px-2">
        <h2 className="text-lg font-semibold text-foreground">Tax summary</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className={`${borderClasses} ${textClasses}`}>DESCRIPTION</th>
              <th className={`${borderClasses} ${textClasses}`}>TAX RATE</th>
              <th className={`${borderClasses} ${textClasses}`}>TAX BASE</th>
              <th className={`${borderClasses} ${textClasses}`}>TAX TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={borderClasses}>Standard Tax Europe</td>
              <td className={borderClasses}>20%</td>
              <td className={borderClasses}>$155.39</td>
              <td className={borderClasses}>$31.08</td>
            </tr>
            <tr>
              <td className={borderClasses}>Shipping Tax</td>
              <td className={borderClasses}>0%</td>
              <td className={borderClasses}>$5.00</td>
              <td className={borderClasses}>$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxSummary;
