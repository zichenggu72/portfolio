export interface Experience {
  year: string;
  items: ExperienceItem[];
}

export interface ExperienceItem {
  header: string;
  description: string;
  previewImages: string[];
}
