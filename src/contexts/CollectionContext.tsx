import { createContext, useContext, useState, type ReactNode } from "react";
import type { Photo } from "@/types/photo";
import type { FolderItem } from "@/components/FolderList";

const MOCK_PHOTOS: Photo[] = [
  {
    id: "1",
    name: "IMG_0322.jpeg",
    url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&auto=format&fit=crop&q=60",
    facesRecognized: 1,
    uploadedAt: "2026-06-11T09:58:42.000Z",
  },
];

interface CollectionContextType {
  photos: Photo[];
  folders: FolderItem[];
  addPhotos: (newPhotos: Photo[], folderId?: string) => void;
  deletePhoto: (id: string) => void;
  bulkDeletePhotos: (ids: string[]) => void;
  addFolder: (name: string) => string;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>(MOCK_PHOTOS);
  const [folders, setFolders] = useState<FolderItem[]>([]);

  function addPhotos(newPhotos: Photo[], folderId?: string) {
    setPhotos((prev) => [
      ...newPhotos.map((p) => (folderId ? { ...p, folderId } : p)),
      ...prev,
    ]);
  }

  function deletePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function bulkDeletePhotos(ids: string[]) {
    setPhotos((prev) => prev.filter((p) => !ids.includes(p.id)));
  }

  function addFolder(name: string): string {
    const id = crypto.randomUUID();
    setFolders((prev) => [...prev, { id, name }]);
    return id;
  }

  function renameFolder(id: string, name: string) {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setPhotos((prev) =>
      prev.map((p) => (p.folderId === id ? { ...p, folderId: undefined } : p)),
    );
  }

  return (
    <CollectionContext.Provider
      value={{
        photos,
        folders,
        addPhotos,
        deletePhoto,
        bulkDeletePhotos,
        addFolder,
        renameFolder,
        deleteFolder,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  const ctx = useContext(CollectionContext);
  if (!ctx)
    throw new Error(
      "useCollectionContext must be used within CollectionProvider",
    );
  return ctx;
}
