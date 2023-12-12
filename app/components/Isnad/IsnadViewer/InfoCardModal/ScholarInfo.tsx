import React from 'react';

export type ScholarData = {
  fullName?: string;
  areaOfInterest?: string;
  parents?: string;
  teachers?: string;
  students?: string;
  siblings?: string;
  spouses?: string;
  children?: string;
  tags?: string;
  designation?: string;
  bornAt?: string;
  diedAt?: string;
  bio: string;
};

type Props = {
  scholarData: ScholarData;
};

function ScholarInfo({ scholarData }: Props) {
  return (
    <div className="mt-2  overflow-y-scroll max-h-[200px] text-sm text-gray-800">
      {scholarData?.fullName && (
        <p>
          {' '}
          <span className="text-blue-500">Full name:</span>{' '}
          {scholarData.fullName}{' '}
        </p>
      )}
      {scholarData?.areaOfInterest && (
        <p>
          <span className="text-blue-500">Area of interest:</span>{' '}
          {scholarData.areaOfInterest}{' '}
        </p>
      )}

      {scholarData?.parents && (
        <p>
          <span className="text-blue-500">Parents:</span> {scholarData.parents}{' '}
        </p>
      )}

      {scholarData?.teachers && (
        <p>
          <span className="text-blue-500">Teachers/narrated:</span>{' '}
          {scholarData.teachers}{' '}
        </p>
      )}

      {scholarData?.students && (
        <p>
          <span className="text-blue-500">Students/narrated to:</span>{' '}
          {scholarData.students}{' '}
        </p>
      )}

      {scholarData?.siblings && (
        <p>
          {' '}
          <span className="text-blue-500">Siblings:</span>{' '}
          {scholarData.siblings}{' '}
        </p>
      )}
      {
        scholarData?.spouses && (
          <p>
            {' '}
            <span className="text-blue-500">Spouses:</span>{' '}
            {scholarData.spouses}{' '}
          </p>
        ) /* spouse */
      }

      {
        scholarData?.children && (
          <p>
            {' '}
            <span className="text-blue-500">Children:</span>{' '}
            {scholarData.children}{' '}
          </p>
        ) /* children */
      }

      {
        scholarData?.tags && (
          <p>
            {' '}
            <span className="text-blue-500">Tags:</span> {scholarData.tags}{' '}
          </p>
        ) /* tags */
      }
    </div>
  );
}

export default ScholarInfo;
