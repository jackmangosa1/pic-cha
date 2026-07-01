import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { useCollectionContext } from "@/contexts/CollectionContext";
import { Route } from "@/routes/search";
import { LucideIcon, Shield, ShieldOff, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type ActionType = "camera" | "upload";

const actionsCards: {
  id: number;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  action: ActionType;
}[] = [
  {
    id: 1,
    icon: ShieldOff,
    title: "Camera",
    subtitle: "Take a selfie",
    action: "camera",
  },
  {
    id: 2,
    icon: Upload,
    title: "Upload Selfie",
    subtitle: "From your device",
    action: "upload",
  },
];

function SearchPhotoPage() {
  const { collectionId } = Route.useSearch();
  const { getCollectionById } = useCollectionContext();
  const collection = getCollectionById(collectionId);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  async function openCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
      });

      setStream(mediaStream);
      setCameraOpen(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      toast.error("Camera access denied or not supported");
    }
  }

  function closeCamera() {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setCameraOpen(false);
  }

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    console.log("Captured image:", imageData);

    closeCamera();
  }

  function handleCardClick(action: "camera" | "upload") {
    if (action === "camera") {
      openCamera();
    }

    if (action === "upload") {
      uploadInputRef.current?.click();
    }
  }

  if (!collection) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-muted-foreground">Collection not found</p>
      </div>
    );
  }

  return (
    <>
      <section className="flex min-h-full flex-col items-center justify-center px-4 py-5">
        <div className="grid grid-cols-1 py-3 text-center">
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {collection.name}
          </div>
          <h1>
            by{" "}
            <strong className="font-medium text-foreground">
              {collection.creatorName}
            </strong>
          </h1>
        </div>
        <Card className="w-full max-w-3xl">
          <CardContent className="-m-3">
            <Card className="border-amber-300 m-2">
              <CardContent className="py-8">
                <div className="text-center">
                  <h1 className=" text-2xl font-bold tracking-tight text-foreground">
                    Find Your Photos
                  </h1>
                  <h1 className="font-medium text-foreground">
                    Take a selfie or upload a close-up photo to instantly find
                    every photo you're in.
                  </h1>
                </div>

                <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2">
                  {actionsCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Card
                        key={item.id}
                        onClick={() => handleCardClick(item.action)}
                        className=" flex min-h-52 flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-secondary"
                      >
                        <CardContent className="flex flex-1 flex-col items-center p-6">
                          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>

                          <div className="flex h-2 items-center justify-center">
                            <h2 className="text-center text-lg font-semibold">
                              {item.title}
                            </h2>
                          </div>

                          <div className="mt-2 flex h-4 items-start justify-center">
                            <p className="text-center text-sm text-muted-foreground">
                              {item.subtitle}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-muted-foreground">
                    <Shield size={15} className="text-white " />
                  </div>
                  <h1 className="text-muted-foreground">
                    Your photo is only used for matching.
                  </h1>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>

      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-[400px] w-[300px] rounded-xl bg-black"
            />

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-3">
              <button
                onClick={takePhoto}
                className="rounded-lg bg-white px-4 py-2 font-medium text-black"
              >
                Capture
              </button>

              <button
                onClick={closeCamera}
                className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
      />

      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
    </>
  );
}

export default SearchPhotoPage;
