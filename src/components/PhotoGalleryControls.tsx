import { useRef } from "react";
import {
  Upload,
  Search,
  LayoutGrid,
  List,
  ArrowUpDown,
  RefreshCw,
  Download,
  Trash2,
  X,
} from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/components/PhotoGallery";
import type { Photo } from "@/types/photo";
import type { SortOption } from "@/hooks/usePhotoGalleryState";

interface Props {
  totalCount: number;
  filteredCount: number;
  query: string;
  onQueryChange: (q: string) => void;
  sortOption: SortOption;
  onSortChange: (s: SortOption) => void;
  isSortOpen: boolean;
  onSortOpenChange: (open: boolean) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  isSelectMode: boolean;
  onToggleSelectMode: () => void;
  selectedIds: Set<string>;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onAddPhotos: (photos: Photo[]) => void;
  onBulkDelete: (ids: string[]) => void;
}

export function PhotoGalleryControls({
  totalCount,
  filteredCount,
  query,
  onQueryChange,
  sortOption,
  onSortChange,
  isSortOpen,
  onSortOpenChange,
  viewMode,
  onViewModeChange,
  isSelectMode,
  onToggleSelectMode,
  selectedIds,
  onSelectAll,
  onClearSelection,
  onAddPhotos,
  onBulkDelete,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onAddPhotos(
      Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file),
        facesRecognized: Math.floor(Math.random() * 3),
        uploadedAt: dayjs().toISOString(),
      })),
    );
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Photos
          </h2>
          <span className="text-sm font-medium text-muted-foreground">
            {filteredCount} of {totalCount}
          </span>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-full gap-1.5 shadow-xs sm:w-auto"
          >
            <Upload className="size-4" />
            Upload
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 shadow-xs"
            title="Refresh"
          >
            <RefreshCw className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Search + sort/select/view controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 pointer-events-none text-muted-foreground/70" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="h-9 w-full rounded-full border border-input bg-muted/30 px-9 py-2 text-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-sm sm:justify-end">
          <div className="flex items-center gap-1.5">
            {isSelectMode && filteredCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSelectAll}
                className="font-medium text-muted-foreground hover:text-foreground"
              >
                {selectedIds.size === filteredCount ? "Deselect All" : "Select All"}
              </Button>
            )}

            <Button
              variant={isSelectMode ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "font-medium text-muted-foreground hover:text-foreground",
                isSelectMode && "bg-secondary text-primary",
              )}
              onClick={onToggleSelectMode}
            >
              {isSelectMode ? "Cancel" : "Select"}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 font-medium text-muted-foreground hover:text-foreground"
                onClick={() => onSortOpenChange(!isSortOpen)}
              >
                <ArrowUpDown className="size-3.5" />
                Sort
              </Button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => onSortOpenChange(false)}
                  />
                  <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                    {(
                      [
                        { label: "Newest Uploaded", value: "date-desc" },
                        { label: "Oldest Uploaded", value: "date-asc" },
                        { label: "Name: A to Z", value: "name-asc" },
                        { label: "Name: Z to A", value: "name-desc" },
                      ] as { label: string; value: SortOption }[]
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          onSortChange(opt.value);
                          onSortOpenChange(false);
                        }}
                        className={cn(
                          "w-full rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          sortOption === opt.value &&
                            "bg-muted font-medium text-foreground",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center rounded-md border border-input bg-background p-0.5">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="size-7 rounded-sm p-0"
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="size-7 rounded-sm p-0"
              onClick={() => onViewModeChange("list")}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk action toolbar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex min-w-70 items-center justify-between gap-4 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-xl">
            <span className="pl-1">
              {selectedIds.size} photo{selectedIds.size !== 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-1 border-l border-border pl-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                title="Download Selected"
              >
                <Download className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-destructive hover:text-destructive/80"
                title="Delete Selected"
                onClick={() => {
                  onBulkDelete([...selectedIds]);
                  onClearSelection();
                }}
              >
                <Trash2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                title="Close"
                onClick={onClearSelection}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
