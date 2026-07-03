import { useState } from "react";
import { ArrowLeft, Folder, Home, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PhotoGalleryControls } from "@/components/PhotoGalleryControls";
import { PhotoGallery } from "@/components/PhotoGallery";
import { usePhotoGalleryState } from "@/hooks/usePhotoGalleryState";
import { MOCK_PHOTOS } from "@/lib/mock-data";
import { Route } from "@/routes/collections.$id.folders.$folderId";
import type { Photo } from "@/types/photo";

export function FolderDetailPage() {
  const { id, folderId } = Route.useParams();
  const { folderName, collectionName, createdAt } = Route.useSearch();

  const [photos, setPhotos] = useState<Photo[]>(MOCK_PHOTOS);

  function addPhotos(newPhotos: Photo[], targetFolderId?: string) {
    setPhotos((prev) => [
      ...newPhotos.map((p) =>
        targetFolderId ? { ...p, folderId: targetFolderId } : p,
      ),
      ...prev,
    ]);
  }

  function deletePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function bulkDeletePhotos(ids: string[]) {
    setPhotos((prev) => prev.filter((p) => !ids.includes(p.id)));
  }

  const folderPhotos = photos.filter((p) => p.folderId === folderId);
  const { controls, gallery } = usePhotoGalleryState(folderPhotos);

  return (
    <main className="relative mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/collections/$id"
        params={{ id }}
        search={{ name: collectionName, createdAt }}
        className="group mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to {collectionName}
      </Link>

      <nav className="mb-2 flex items-center gap-1.5 text-sm">
        <Link
          to="/collections/$id"
          params={{ id }}
          search={{ name: collectionName, createdAt }}
          className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Home className="size-3.5" />
          <span>All</span>
        </Link>
        <ChevronRight className="size-3.5 text-muted-foreground/50" />
        <span className="flex items-center gap-1 font-medium text-foreground">
          <Folder className="size-3.5 text-primary" />
          {folderName}
        </span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        {folderName}
      </h1>

      <div className="space-y-4 pb-24">
        <PhotoGalleryControls
          {...controls}
          onAddPhotos={(newPhotos) => addPhotos(newPhotos, folderId)}
          onBulkDelete={bulkDeletePhotos}
        />
        <PhotoGallery
          {...gallery}
          onDeletePhoto={deletePhoto}
        />
      </div>
    </main>
  );
}
