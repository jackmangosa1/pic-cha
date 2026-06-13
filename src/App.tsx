import "./App.css";
import { Navbar } from "@/components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="text-muted-foreground">Welcome to Pic-Cha!</p>
      </main>
    </div>
  );
}

export default App;
