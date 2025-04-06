export interface BlogSection {
    title: string;
    content: string;
  }
  
  export interface BlogContent {
    subject: string;
    affiliateLink: string;
    sections: BlogSection[];
    images: string[];
  }