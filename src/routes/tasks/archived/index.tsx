import BackButton from "@/components/buttons/back-button";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { IconSearch } from "@douyinfe/semi-icons";
import { Input } from "@douyinfe/semi-ui-19";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/tasks/archived/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  return (
    <AuthenticatedLayout>
      <div className="flex flex-col h-full bg-[#0d1117] px-6 py-3">
        <BackButton />
        <div className="flex items-center gap-4 my-4">
          <Input
            prefix={<IconSearch />}
            placeholder="Filter by title..."
            value={search}
            onChange={(e) => setSearch(e)}
          />
        </div>
        
      </div>
    </AuthenticatedLayout>
  );
}
