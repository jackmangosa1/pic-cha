export interface Photo {
  id: string;
  name: string;
  url: string;
  facesRecognized: number;
  uploadedAt: string;
  folderId?: string;
}
