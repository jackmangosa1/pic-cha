import { useState, useRef } from "react";
import { Camera, Check, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_USER = {
  name: "Jacques Mangosa",
  email: "Jacques.Mangosa@dccs.eu",
  initials: "JM",
};

function Field({
  label,
  value,
  type = "text",
  onSave,
}: {
  label: string;
  value: string;
  type?: "text" | "email";
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function save() {
    onSave(draft.trim() || value);
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <div className="w-28 shrink-0 text-sm font-medium text-muted-foreground">
        {label}
      </div>
      {editing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            type={type}
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            className="h-8 flex-1 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={save}
            className="size-8 shrink-0 text-green-500 hover:text-green-600"
          >
            <Check className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={cancel}
            className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-between gap-2">
          <span className="text-sm text-foreground">{value}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDraft(value);
              setEditing(true);
            }}
            className="h-7 shrink-0 text-xs text-muted-foreground hover:text-foreground"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

function PasswordField() {
  const [changing, setChanging] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);

  function cancel() {
    setChanging(false);
    setCurrent("");
    setNext("");
    setConfirm("");
  }

  return (
    <div className="border-b border-border py-4 last:border-0">
      {changing ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Change Password</p>
          {[
            {
              label: "Current password",
              value: current,
              set: setCurrent,
              show: showCurrent,
              toggle: () => setShowCurrent((s) => !s),
            },
            {
              label: "New password",
              value: next,
              set: setNext,
              show: showNext,
              toggle: () => setShowNext((s) => !s),
            },
            {
              label: "Confirm new password",
              value: confirm,
              set: setConfirm,
              show: showNext,
              toggle: () => setShowNext((s) => !s),
            },
          ].map(({ label, value, set, show, toggle }) => (
            <div key={label} className="relative">
              <label className="mb-1 block text-xs text-muted-foreground">
                {label}
              </label>
              <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => set(e.target.value)}
                className="h-9 w-full rounded-lg border border-input bg-background px-3 pr-9 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button
                type="button"
                onClick={toggle}
                className="absolute right-2.5 top-[calc(1.5rem+4px)] text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <Button size="sm" className="h-8 shadow-none">
              Save password
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={cancel}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <div className="w-28 shrink-0 text-sm font-medium text-muted-foreground">
            Password
          </div>
          <div className="flex flex-1 items-center justify-between">
            <span className="text-sm tracking-widest text-foreground">
              ••••••••
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChanging(true)}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Change
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProfilePage() {
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
    e.target.value = "";
  }

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-12 sm:px-6">
      {/* Avatar */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <input
          type="file"
          ref={avatarRef}
          onChange={handleAvatarChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => avatarRef.current?.click()}
          className="group relative size-20 overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-gradient text-xl font-semibold text-white">
              {initials}
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100",
            )}
          >
            <Camera className="size-5 text-white" />
          </div>
        </button>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      {/* Editable fields */}
      <div className="rounded-xl border border-border bg-card px-6">
        <Field label="Name" value={name} onSave={setName} />
        <Field label="Email" value={email} type="email" onSave={setEmail} />
        <PasswordField />
      </div>
    </main>
  );
}
