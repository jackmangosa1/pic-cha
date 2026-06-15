import { useState } from "react";
import dayjs from "dayjs";
import type { Photo } from "@/types/photo";
import type { ViewMode } from "@/components/PhotoGallery";

export type SortOption = "date-desc" | "date-asc" | "name-asc" | "name-desc";

export function usePhotoGalleryState(photos: Photo[]) {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = photos.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "date-desc")
      return dayjs(b.uploadedAt).valueOf() - dayjs(a.uploadedAt).valueOf();
    if (sortOption === "date-asc")
      return dayjs(a.uploadedAt).valueOf() - dayjs(b.uploadedAt).valueOf();
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
    setIsSelectMode(false);
  }

  function selectAll() {
    setSelectedIds(
      selectedIds.size === sorted.length
        ? new Set()
        : new Set(sorted.map((p) => p.id)),
    );
  }

  function toggleSelectMode() {
    setIsSelectMode((prev) => !prev);
    setSelectedIds(new Set());
  }

  return {
    controls: {
      totalCount: photos.length,
      filteredCount: sorted.length,
      query,
      onQueryChange: setQuery,
      sortOption,
      onSortChange: setSortOption,
      isSortOpen,
      onSortOpenChange: setIsSortOpen,
      viewMode,
      onViewModeChange: setViewMode,
      isSelectMode,
      onToggleSelectMode: toggleSelectMode,
      selectedIds,
      onSelectAll: selectAll,
      onClearSelection: clearSelection,
    },
    gallery: {
      photos: sorted,
      viewMode,
      isSelectMode,
      selectedIds,
      onToggleSelect: toggleSelect,
    },
  };
}
