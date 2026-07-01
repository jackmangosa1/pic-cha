import { useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/collections.$id.index";
import { ShareDialog } from "@/components/ShareDialog";
import { FolderList } from "@/components/FolderList";
import { PhotoGalleryControls } from "@/components/PhotoGalleryControls";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CollectionSettings } from "@/components/CollectionSettings";
import { useCollectionContext } from "@/contexts/CollectionContext";
import { usePhotoGalleryState } from "@/hooks/usePhotoGalleryState";
import { cn } from "@/lib/utils";

const GUEST_SEARCHES = { current: 1, max: 10 };

export function CollectionDetailPage() {
  const { id } = Route.useParams();
  const { name, createdAt } = Route.useSearch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"photos" | "settings">("photos");
  const [shareOpen, setShareOpen] = useState(false);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);

  const {
    photos,
    folders,
    addPhotos,
    deletePhoto,
    bulkDeletePhotos,
    addFolder,
    renameFolder,
    deleteFolder,
  } = useCollectionContext();

  const rootPhotos = photos.filter((p) => !p.folderId);
  const { controls, gallery } = usePhotoGalleryState(rootPhotos);

  const searchPercentage = (GUEST_SEARCHES.current / GUEST_SEARCHES.max) * 100;

  function handleFolderSelect(folderId: string) {
    const folder = folders.find((f) => f.id === folderId);
    navigate({
      to: "/collections/$id/folders/$folderId",
      params: { id, folderId },
      search: {
        folderName: folder?.name ?? "Folder",
        collectionName: name,
        createdAt,
      },
    });
  }

  return (
    <main className="relative mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/"
            className="group mb-2 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Collections
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm">
            <div className="flex items-center gap-3">
              <Link
                to="/search"
                search={{
                  collectionId: id,
                }}
              >
                <span className="inline-block font-medium text-foreground transition-all duration-200 ease-out hover:scale-105 hover:text-primary">
                  Guest Searches
                  <span className="font-normal text-muted-foreground">
                    ({GUEST_SEARCHES.current}/{GUEST_SEARCHES.max})
                  </span>
                </span>
              </Link>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${searchPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 self-start shadow-xs sm:w-auto"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="size-4" />
          Share
        </Button>
      </div>

      <hr className="my-8 border-border" />

      <div className="mb-6 flex w-fit items-center gap-1 rounded-lg bg-muted/60 p-1 text-sm">
        <button
          onClick={() => setActiveTab("photos")}
          className={cn(
            "rounded-md px-3 py-1.5 font-medium transition-colors",
            activeTab === "photos"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Photos
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={cn(
            "rounded-md px-3 py-1.5 font-medium transition-colors",
            activeTab === "settings"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Settings
        </button>
      </div>

      {activeTab === "photos" ? (
        <div className="space-y-4 pb-24">
          <PhotoGalleryControls
            {...controls}
            onAddPhotos={(newPhotos) => addPhotos(newPhotos)}
            onBulkDelete={bulkDeletePhotos}
          />
          <FolderList
            folders={folders}
            onNew={addFolder}
            onRename={renameFolder}
            onDelete={deleteFolder}
            onSelect={handleFolderSelect}
            newDialogOpen={folderDialogOpen}
            onNewDialogOpenChange={setFolderDialogOpen}
          />
          <PhotoGallery {...gallery} onDeletePhoto={deletePhoto} />
        </div>
      ) : (
        <CollectionSettings />
      )}

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        collectionId={id}
        collectionName={name}
      />
    </main>
  );
}
