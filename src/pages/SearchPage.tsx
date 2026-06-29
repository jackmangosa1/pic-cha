import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useCollectionContext } from "@/contexts/CollectionContext";
import { Route } from "@/routes/search";
import { FiShieldOff } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";

const actionsCards = [
  {
    id: 1,
    icon: FiShieldOff,
    title: "Camera Blocked",
    subtitle: "Allow camera access in settings",
  },
  {
    id: 1,
    icon: MdOutlineFileUpload,
    title: "Upload Selfie",
    subtitle: "From your device",
  },
];

function SearchPage() {
  const { collectionId } = Route.useSearch();
  const { getCollectionById } = useCollectionContext();
  const collection = getCollectionById(collectionId);
  const { collections } = useCollectionContext();

  //   console.log("collectionId:", collectionId);
  //   console.log("ALL COLLECTIONS:", collections);
  //   console.log("found:", collection);

  return (
    <>
      {/* <div>
        <h1 className="text-2xl font-bold">Guest Searches</h1>
        <p>
          <strong>Collection:</strong> {collection?.name ?? "Unknown"}
        </p>
        <p>
          <strong>Created by:</strong> {collection?.creatorName ?? "Unknown"}
        </p>
      </div> */}

      <section className="mx-64 min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 py-3 text-center">
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {collection?.name ?? "Unknown"}
          </div>
          <h1>
            by{" "}
            <strong className="font-medium text-foreground">
              {collection?.creatorName ?? "Unknown"}
            </strong>
          </h1>
        </div>

        <Card className="border-amber-700 w-1/2">
          <CardContent className="-m-3">
            <Card className="border-amber-300 m-2">
              <CardContent>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Find Your Photos
                </h1>
                <h1 className="text-center font-medium text-foreground">
                  Take a selfie or upload a close-up photo to instantly find
                  every photo you're in.
                </h1>

                <div className="flex items-center justify-center gap-3">
                  {actionsCards.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Card>
                        <CardTitle className="flex items-center justify-center">
                          <div className="flex items-center justify-center rounded-full h-8 w-8 text-muted-foreground bg-amber-200">
                            <Icon />
                          </div>
                        </CardTitle>
                        <CardContent>
                          <h1 className="text-lg text-center font-bold tracking-tight text-foreground">
                            {item.title}
                          </h1>
                          <h1 className="text-sm text-justify tracking-tight text-foreground">
                            {item.subtitle}
                          </h1>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default SearchPage;
