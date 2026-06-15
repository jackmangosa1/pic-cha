import { useState } from "react";
import { CheckCircle2, Download, ImageOff, Trash2, RefreshCw } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types/photo";
import { PhotoViewerDialog } from "@/components/PhotoViewerDialog";

export type ViewMode = "grid" | "list";

interface Props {
  photos: Photo[];
  viewMode: ViewMode;
  isSelectMode: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onDeletePhoto: (id: string) => void;
}

export function PhotoGallery({
  photos,
  viewMode,
  isSelectMode,
  selectedIds,
  onToggleSelect,
  onDeletePhoto,
}: Props) {
  const [viewerPhoto, setViewerPhoto] = useState<Photo | null>(null);

  function handlePhotoClick(photo: Photo) {
    if (isSelectMode) {
      onToggleSelect(photo.id);
    } else {
      setViewerPhoto(photo);
    }
  }

  return (
    <>
      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/10 p-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted shadow-xs">
            <ImageOff className="size-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-foreground">
            No photos found
          </h3>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {photos.map((photo) => {
            const isSelected = selectedIds.has(photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className={cn(
                  "group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted shadow-xs transition-all duration-200 hover:shadow-md",
                  isSelectMode && "select-none",
                  isSelected && "border-transparent ring-2 ring-primary",
                )}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="h-full w-full object-cover"
                />

                {isSelectMode ? (
                  <div className="absolute right-3 top-3 z-10">
                    <div
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full border shadow-xs transition-all",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/50 bg-background/80 backdrop-blur-xs",
                      )}
                    >
                      {isSelected && <CheckCircle2 className="size-4 stroke-3" />}
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-background/90 px-3 py-1.5 opacity-0 shadow-sm backdrop-blur-xs transition-opacity group-hover:opacity-100">
                    <button
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      title="Download"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="size-4" />
                    </button>
                    <button
                      className="text-destructive transition-colors hover:text-destructive/80"
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(photo.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                )}

                {isSelectMode && isSelected && (
                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-border bg-background pt-2 shadow-xs">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {isSelectMode && <th className="w-12 p-4 text-center" />}
                <th className="p-4 font-semibold">Thumbnail</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Faces Recognized</th>
                <th className="p-4 font-semibold">Uploaded At</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((photo) => {
                const isSelected = selectedIds.has(photo.id);
                return (
                  <tr
                    key={photo.id}
                    onClick={() => isSelectMode && onToggleSelect(photo.id)}
                    className={cn(
                      "border-b border-border transition-colors last:border-0 hover:bg-muted/30",
                      isSelectMode && "cursor-pointer",
                      isSelected && "bg-primary/5",
                    )}
                  >
                    {isSelectMode && (
                      <td className="p-4 text-center">
                        <div
                          className={cn(
                            "mx-auto flex size-4 items-center justify-center rounded-sm border transition-all",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/40",
                          )}
                        >
                          {isSelected && <CheckCircle2 className="size-3 stroke-3" />}
                        </div>
                      </td>
                    )}
                    <td className="p-4">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewerPhoto(photo);
                        }}
                        className="size-12 cursor-pointer rounded-xl border border-border bg-muted object-cover transition-opacity hover:opacity-80"
                      />
                    </td>
                    <td className="p-4 font-medium text-foreground">{photo.name}</td>
                    <td className="p-4 text-muted-foreground">
                      {photo.facesRecognized} face{photo.facesRecognized !== 1 ? "s" : ""}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {dayjs(photo.uploadedAt).format("D MMM YYYY, hh:mm:ss A")} GMT+2
                    </td>
                    <td className="p-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-md text-muted-foreground hover:text-foreground"
                        >
                          <Download className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-md text-muted-foreground hover:text-foreground"
                        >
                          <RefreshCw className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-md text-destructive hover:text-destructive/80"
                          onClick={() => onDeletePhoto(photo.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <PhotoViewerDialog
        photo={viewerPhoto}
        onClose={() => setViewerPhoto(null)}
        onDelete={(id) => {
          onDeletePhoto(id);
          setViewerPhoto(null);
        }}
      />
    </>
  );
}
