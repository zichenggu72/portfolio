import React from "react";
import { GetStaticProps } from "next";
import { Experience } from "app/types/experience";
import WorkPreview from "app/components/WorkPreview";
import { getAllExperiences } from "app/data/utils/experience";

interface WorksProps {
  experiences: Experience[];
}

const WorksLayout: React.FC<WorksProps> = () => {
  const experiences = getAllExperiences();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Works</h1>
      <table className="w-full">
        <tbody>
          {experiences.map((exp, index) => (
            <tr key={index}>
              <td className="p-2 align-top pr-8 w-1/6 text-left">
                <span className="">{exp.year}</span>
              </td>
              <td className="p-2">
                {exp.items.map((item, itemIndex) => (
                  <WorkPreview key={itemIndex} {...item} />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorksLayout;
