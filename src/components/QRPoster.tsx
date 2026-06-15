import QRCode from "react-qr-code";
import { Camera } from "lucide-react";

interface Props {
  collectionName: string;
  shareUrl: string;
  sharedBy: string;
}

export function QRPoster({ collectionName, shareUrl, sharedBy }: Props) {
  return (
    <div className="flex w-56 flex-col items-center overflow-hidden rounded-2xl bg-[#0d0d0d] text-white shadow-xl">
      <div className="h-1 w-full bg-brand-gradient" />

      <div className="flex flex-col items-center gap-3 px-6 py-8">
        <h2 className="text-center text-xl font-bold tracking-tight">
          {collectionName}
        </h2>

        <p className="text-center text-xs text-white/60">
          Scan to search for your photos
        </p>

        <div className="relative mt-1 rounded-xl bg-white p-3">
          <QRCode
            value={shareUrl}
            size={120}
            bgColor="#ffffff"
            fgColor="#0d0d0d"
            style={{ display: "block" }}
          />
          <div className="absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-brand-gradient shadow-sm">
            <Camera className="size-4 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="mt-2 text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            Shared by
          </p>
          <p className="mt-0.5 text-sm font-semibold">{sharedBy}</p>
        </div>
      </div>

      <div className="w-full border-t border-white/10 py-2 text-center">
        <p className="text-[10px] text-white/30">Powered by Pic-Cha</p>
      </div>
    </div>
  );
}
